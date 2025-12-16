import './style.css';
import { Game } from './Game';

async function main() {
  const game = new Game();
  
  try {
    await game.init();
    game.start();
    console.log('🎮 Pokemon Gym loaded! Use arrow keys to move, Space to interact.');
  } catch (error) {
    console.error('Failed to initialize game:', error);
  }
}

main();
