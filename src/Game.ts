import {
  InputHandler,
  CollisionSystem,
  MovementSystem,
  DialogSystem,
  Renderer,
  type Player,
  type NPC,
  type TileMap,
} from './engine';

import gymMapData from './data/maps/gym.json';
import npcData from './data/npcs.json';

export class Game {
  private input: InputHandler;
  private collision!: CollisionSystem;
  private movement!: MovementSystem;
  private dialog: DialogSystem;
  private renderer: Renderer;

  private player!: Player;
  private npcs: NPC[] = [];
  private map!: TileMap;

  private lastTime = 0;
  private isRunning = false;

  constructor() {
    this.input = new InputHandler();
    this.dialog = new DialogSystem();
    
    // Calculate viewport size based on map
    const tileSize = gymMapData.tileSize;
    const viewportTilesX = gymMapData.width;
    const viewportTilesY = gymMapData.height;
    
    this.renderer = new Renderer(tileSize, viewportTilesX, viewportTilesY);
  }

  async init(): Promise<void> {
    await this.renderer.init();
    this.loadMap();
    this.loadNPCs();
    this.createPlayer();
    
    // Initialize systems that depend on map/npcs
    this.collision = new CollisionSystem(this.map, this.npcs);
    this.movement = new MovementSystem(this.collision, this.map.tileSize);
    
    // Initial render
    this.renderer.renderMap(this.map);
    this.renderer.renderNPCs(this.npcs);
  }

  private loadMap(): void {
    this.map = {
      width: gymMapData.width,
      height: gymMapData.height,
      tileSize: gymMapData.tileSize,
      layers: {
        floor: gymMapData.layers.floor,
        collision: gymMapData.layers.collision,
      },
    };
  }

  private loadNPCs(): void {
    this.npcs = npcData.npcs.map(npc => ({
      id: npc.id,
      name: npc.name,
      position: { x: npc.position.x, y: npc.position.y },
      facing: npc.facing as 'up' | 'down' | 'left' | 'right',
      spriteKey: npc.spriteKey,
      dialog: npc.dialog,
    }));
  }

  private createPlayer(): void {
    const start = gymMapData.playerStart;
    this.player = {
      position: { x: start.x, y: start.y },
      facing: 'up',
      isMoving: false,
    };
  }

  start(): void {
    this.isRunning = true;
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);
  }

  private gameLoop = (currentTime: number): void => {
    if (!this.isRunning) return;

    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.update(deltaTime, currentTime);
    this.render();

    requestAnimationFrame(this.gameLoop);
  };

  private update(deltaTime: number, currentTime: number): void {
    const inputState = this.input.getState();

    // Update dialog system
    this.dialog.update(currentTime);

    // Handle dialog state
    if (this.dialog.isOpen()) {
      if (inputState.interact) {
        this.dialog.advance();
        this.input.consumeInteract();
      }
      return; // Lock movement while dialog is open
    }

    // Handle interaction
    if (inputState.interact) {
      this.tryInteract();
      this.input.consumeInteract();
    }

    // Handle movement
    if (!this.movement.isMoving()) {
      const direction = this.input.getDirection();
      if (direction) {
        this.movement.tryMove(this.player, direction);
      }
    }

    // Update movement animation
    this.movement.update(this.player, deltaTime);
  }

  private tryInteract(): void {
    const facingTile = this.collision.getFacingTile(this.player.position, this.player.facing);
    const npc = this.collision.getNpcAt(facingTile);
    
    if (npc) {
      this.dialog.startDialog(npc);
    }
  }

  private render(): void {
    // Get visual position (interpolated during movement)
    const visualPos = this.movement.getVisualPosition(this.player);
    
    // Render player
    this.renderer.renderPlayer(visualPos, this.player.facing);
    
    // Render NPCs
    this.renderer.renderNPCs(this.npcs);

    // Render dialog
    const dialogState = this.dialog.getState();
    if (dialogState.isOpen) {
      this.renderer.showDialog(
        this.dialog.getCurrentNpcName(),
        dialogState.displayedText,
        dialogState.isTyping
      );
    } else {
      this.renderer.hideDialog();
    }
  }
}
