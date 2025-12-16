// Core game types

export interface Position {
  x: number;
  y: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Player {
  position: Position;
  facing: Direction;
  isMoving: boolean;
}

export interface NPC {
  id: string;
  name: string;
  position: Position;
  facing: Direction;
  spriteKey: string;
  dialog: string[];
}

export interface TileMap {
  width: number;
  height: number;
  tileSize: number;
  layers: {
    floor: number[][];
    collision: boolean[][];
    decorations?: number[][];
  };
}

export interface GameState {
  player: Player;
  npcs: NPC[];
  map: TileMap;
  dialogState: DialogState;
  flags: Record<string, boolean>;
}

export interface DialogState {
  isOpen: boolean;
  currentNpcId: string | null;
  currentLineIndex: number;
  displayedText: string;
  isTyping: boolean;
}

export interface InputState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  interact: boolean;
}

export interface SpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SpriteAnimation {
  frames: SpriteFrame[];
  frameTime: number;
}

export interface SpriteSheet {
  texture: string;
  animations: Record<string, SpriteAnimation>;
}
