import type { Player, Direction, Position } from './types';
import type { CollisionSystem } from './collision';

export class MovementSystem {
  private collision: CollisionSystem;
  private moveSpeed = 4; // pixels per frame during movement
  private tileSize: number;
  
  // Animation state
  private isAnimating = false;
  private animationProgress = 0;
  private startPosition: Position = { x: 0, y: 0 };
  private targetPosition: Position = { x: 0, y: 0 };

  constructor(collision: CollisionSystem, tileSize: number) {
    this.collision = collision;
    this.tileSize = tileSize;
  }

  tryMove(player: Player, direction: Direction): boolean {
    if (this.isAnimating) return false;

    // Always update facing direction
    player.facing = direction;

    // Check if we can move
    if (!this.collision.canMove(player.position, direction)) {
      return false;
    }

    // Start movement animation
    this.startPosition = { ...player.position };
    this.targetPosition = this.collision.getNextPosition(player.position, direction);
    this.isAnimating = true;
    this.animationProgress = 0;
    player.isMoving = true;

    return true;
  }

  update(player: Player, deltaTime: number): void {
    if (!this.isAnimating) return;

    // Progress the animation
    const step = (this.moveSpeed * deltaTime * 60) / this.tileSize;
    this.animationProgress += step;

    if (this.animationProgress >= 1) {
      // Movement complete
      player.position = { ...this.targetPosition };
      player.isMoving = false;
      this.isAnimating = false;
      this.animationProgress = 0;
    }
  }

  getVisualPosition(player: Player): Position {
    if (!this.isAnimating) {
      return {
        x: player.position.x * this.tileSize,
        y: player.position.y * this.tileSize,
      };
    }

    // Interpolate between start and target
    const progress = Math.min(this.animationProgress, 1);
    return {
      x: (this.startPosition.x + (this.targetPosition.x - this.startPosition.x) * progress) * this.tileSize,
      y: (this.startPosition.y + (this.targetPosition.y - this.startPosition.y) * progress) * this.tileSize,
    };
  }

  isMoving(): boolean {
    return this.isAnimating;
  }
}
