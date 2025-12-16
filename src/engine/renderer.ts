import { Application, Container, Graphics, Text, TextStyle } from 'pixi.js';
import type { NPC, TileMap, Position, Direction } from './types';

// Tile colors for placeholder rendering
const TILE_COLORS: Record<number, number> = {
  0: 0x3d3d3d, // Floor dark
  1: 0x5a5a5a, // Floor light
  2: 0x8b4513, // Wood
  3: 0x654321, // Wood dark
  4: 0x2d2d2d, // Wall
  5: 0x1a1a1a, // Wall dark
  6: 0x4a90d9, // Water/decoration
  7: 0xffd700, // Gold accent
  8: 0x228b22, // Plant
};

export class Renderer {
  private app: Application;
  private mapContainer: Container;
  private entityContainer: Container;
  private uiContainer: Container;
  private dialogBox: Container | null = null;
  private dialogText: Text | null = null;
  private dialogNameText: Text | null = null;
  private instructionsText: Text | null = null;
  
  private tileSize: number;
  private viewportWidth: number;
  private viewportHeight: number;
  
  private playerGraphic: Graphics | null = null;
  private npcGraphics: Map<string, Graphics> = new Map();

  constructor(tileSize: number, viewportTilesX: number, viewportTilesY: number) {
    this.tileSize = tileSize;
    this.viewportWidth = viewportTilesX * tileSize;
    this.viewportHeight = viewportTilesY * tileSize;
    
    this.app = new Application();
    this.mapContainer = new Container();
    this.entityContainer = new Container();
    this.uiContainer = new Container();
  }

  async init(): Promise<void> {
    await this.app.init({
      width: this.viewportWidth,
      height: this.viewportHeight,
      backgroundColor: 0x1a1a2e,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    const container = document.getElementById('app');
    if (container) {
      container.appendChild(this.app.canvas);
      this.app.canvas.style.imageRendering = 'pixelated';
    }

    this.app.stage.addChild(this.mapContainer);
    this.app.stage.addChild(this.entityContainer);
    this.app.stage.addChild(this.uiContainer);

    this.createInstructions();
  }

  private createInstructions(): void {
    const style = new TextStyle({
      fontFamily: 'monospace',
      fontSize: 12,
      fill: 0xffffff,
      align: 'left',
    });

    this.instructionsText = new Text({
      text: '↑↓←→/WASD: Move | Space/Enter/Z: Talk',
      style,
    });
    this.instructionsText.x = 10;
    this.instructionsText.y = 10;
    this.instructionsText.alpha = 0.7;
    this.uiContainer.addChild(this.instructionsText);
  }

  renderMap(map: TileMap): void {
    this.mapContainer.removeChildren();

    const floorLayer = map.layers.floor;
    
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const tileId = floorLayer[y][x];
        const color = TILE_COLORS[tileId] ?? 0x3d3d3d;

        const tile = new Graphics();
        tile.rect(0, 0, this.tileSize, this.tileSize);
        tile.fill(color);
        
        // Add subtle grid lines
        tile.rect(0, 0, this.tileSize, this.tileSize);
        tile.stroke({ width: 1, color: 0x2a2a2a, alpha: 0.3 });
        
        tile.x = x * this.tileSize;
        tile.y = y * this.tileSize;
        this.mapContainer.addChild(tile);

        // Draw collision indicator (walls, rocks)
        if (map.layers.collision[y][x]) {
          const obstacle = new Graphics();
          obstacle.rect(2, 2, this.tileSize - 4, this.tileSize - 4);
          obstacle.fill(0x4a4a4a);
          obstacle.x = x * this.tileSize;
          obstacle.y = y * this.tileSize;
          this.mapContainer.addChild(obstacle);
        }
      }
    }
  }

  renderPlayer(position: Position, facing: Direction): void {
    if (!this.playerGraphic) {
      this.playerGraphic = new Graphics();
      this.entityContainer.addChild(this.playerGraphic);
    }

    this.playerGraphic.clear();
    
    // Draw player body
    this.playerGraphic.circle(this.tileSize / 2, this.tileSize / 2, this.tileSize / 3);
    this.playerGraphic.fill(0xff6b6b);
    
    // Draw facing indicator
    const indicatorOffset = this.tileSize / 4;
    let ix = this.tileSize / 2;
    let iy = this.tileSize / 2;
    
    switch (facing) {
      case 'up': iy -= indicatorOffset; break;
      case 'down': iy += indicatorOffset; break;
      case 'left': ix -= indicatorOffset; break;
      case 'right': ix += indicatorOffset; break;
    }
    
    this.playerGraphic.circle(ix, iy, 4);
    this.playerGraphic.fill(0xffffff);

    this.playerGraphic.x = position.x;
    this.playerGraphic.y = position.y;
  }

  renderNPCs(npcs: NPC[]): void {
    // Remove old NPC graphics
    for (const [id, graphic] of this.npcGraphics) {
      if (!npcs.find(npc => npc.id === id)) {
        this.entityContainer.removeChild(graphic);
        this.npcGraphics.delete(id);
      }
    }

    for (const npc of npcs) {
      let graphic = this.npcGraphics.get(npc.id);
      
      if (!graphic) {
        graphic = new Graphics();
        this.npcGraphics.set(npc.id, graphic);
        this.entityContainer.addChild(graphic);
      }

      graphic.clear();
      
      // Draw NPC body
      graphic.circle(this.tileSize / 2, this.tileSize / 2, this.tileSize / 3);
      graphic.fill(0x4ecdc4);
      
      // Draw facing indicator
      const indicatorOffset = this.tileSize / 4;
      let ix = this.tileSize / 2;
      let iy = this.tileSize / 2;
      
      switch (npc.facing) {
        case 'up': iy -= indicatorOffset; break;
        case 'down': iy += indicatorOffset; break;
        case 'left': ix -= indicatorOffset; break;
        case 'right': ix += indicatorOffset; break;
      }
      
      graphic.circle(ix, iy, 3);
      graphic.fill(0xffffff);

      graphic.x = npc.position.x * this.tileSize;
      graphic.y = npc.position.y * this.tileSize;
    }
  }

  showDialog(name: string, text: string, isTyping: boolean): void {
    if (!this.dialogBox) {
      this.createDialogBox();
    }

    this.dialogBox!.visible = true;
    
    if (this.dialogNameText) {
      this.dialogNameText.text = name;
    }
    
    if (this.dialogText) {
      this.dialogText.text = text + (isTyping ? '▌' : '');
    }
  }

  private createDialogBox(): void {
    this.dialogBox = new Container();
    
    const boxHeight = 80;
    const boxWidth = this.viewportWidth - 40;
    const boxX = 20;
    const boxY = this.viewportHeight - boxHeight - 20;

    // Background
    const bg = new Graphics();
    bg.roundRect(0, 0, boxWidth, boxHeight, 8);
    bg.fill({ color: 0x1a1a2e, alpha: 0.95 });
    bg.stroke({ width: 3, color: 0x4ecdc4 });
    bg.x = boxX;
    bg.y = boxY;
    this.dialogBox.addChild(bg);

    // Name text
    const nameStyle = new TextStyle({
      fontFamily: 'monospace',
      fontSize: 14,
      fill: 0x4ecdc4,
      fontWeight: 'bold',
    });
    this.dialogNameText = new Text({ text: '', style: nameStyle });
    this.dialogNameText.x = boxX + 15;
    this.dialogNameText.y = boxY + 10;
    this.dialogBox.addChild(this.dialogNameText);

    // Dialog text
    const textStyle = new TextStyle({
      fontFamily: 'monospace',
      fontSize: 14,
      fill: 0xffffff,
      wordWrap: true,
      wordWrapWidth: boxWidth - 30,
    });
    this.dialogText = new Text({ text: '', style: textStyle });
    this.dialogText.x = boxX + 15;
    this.dialogText.y = boxY + 32;
    this.dialogBox.addChild(this.dialogText);

    // Advance indicator
    const advanceText = new Text({
      text: '▼ Press Space',
      style: new TextStyle({
        fontFamily: 'monospace',
        fontSize: 10,
        fill: 0x888888,
      }),
    });
    advanceText.x = boxX + boxWidth - 85;
    advanceText.y = boxY + boxHeight - 18;
    this.dialogBox.addChild(advanceText);

    this.uiContainer.addChild(this.dialogBox);
  }

  hideDialog(): void {
    if (this.dialogBox) {
      this.dialogBox.visible = false;
    }
  }

  getApp(): Application {
    return this.app;
  }
}
