import type { InputState, Direction } from './types';

export class InputHandler {
  private keys: Set<string> = new Set();
  private interactPressed = false;
  private interactConsumed = false;

  constructor() {
    this.setupListeners();
  }

  private setupListeners(): void {
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        e.preventDefault();
        this.keys.add(e.key.toLowerCase());
      }
      if (['Enter', ' ', 'z', 'Z'].includes(e.key)) {
        e.preventDefault();
        if (!this.interactPressed) {
          this.interactPressed = true;
          this.interactConsumed = false;
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.key.toLowerCase());
      if (['Enter', ' ', 'z', 'Z'].includes(e.key)) {
        this.interactPressed = false;
        this.interactConsumed = false;
      }
    });
  }

  getState(): InputState {
    return {
      up: this.keys.has('arrowup') || this.keys.has('w'),
      down: this.keys.has('arrowdown') || this.keys.has('s'),
      left: this.keys.has('arrowleft') || this.keys.has('a'),
      right: this.keys.has('arrowright') || this.keys.has('d'),
      interact: this.interactPressed && !this.interactConsumed,
    };
  }

  consumeInteract(): void {
    this.interactConsumed = true;
  }

  getDirection(): Direction | null {
    if (this.keys.has('arrowup') || this.keys.has('w')) return 'up';
    if (this.keys.has('arrowdown') || this.keys.has('s')) return 'down';
    if (this.keys.has('arrowleft') || this.keys.has('a')) return 'left';
    if (this.keys.has('arrowright') || this.keys.has('d')) return 'right';
    return null;
  }
}
