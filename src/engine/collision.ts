import type { Position, TileMap, NPC, Direction } from './types';

export class CollisionSystem {
  private map: TileMap;
  private npcs: NPC[];

  constructor(map: TileMap, npcs: NPC[]) {
    this.map = map;
    this.npcs = npcs;
  }

  updateNpcs(npcs: NPC[]): void {
    this.npcs = npcs;
  }

  isWalkable(position: Position): boolean {
    const { x, y } = position;

    // Check bounds
    if (x < 0 || x >= this.map.width || y < 0 || y >= this.map.height) {
      return false;
    }

    // Check collision layer
    if (this.map.layers.collision[y][x]) {
      return false;
    }

    // Check NPC positions
    for (const npc of this.npcs) {
      if (npc.position.x === x && npc.position.y === y) {
        return false;
      }
    }

    return true;
  }

  getNextPosition(current: Position, direction: Direction): Position {
    switch (direction) {
      case 'up':
        return { x: current.x, y: current.y - 1 };
      case 'down':
        return { x: current.x, y: current.y + 1 };
      case 'left':
        return { x: current.x - 1, y: current.y };
      case 'right':
        return { x: current.x + 1, y: current.y };
    }
  }

  canMove(current: Position, direction: Direction): boolean {
    const next = this.getNextPosition(current, direction);
    return this.isWalkable(next);
  }

  getFacingTile(position: Position, direction: Direction): Position {
    return this.getNextPosition(position, direction);
  }

  getNpcAt(position: Position): NPC | null {
    return this.npcs.find(npc => npc.position.x === position.x && npc.position.y === position.y) || null;
  }
}
