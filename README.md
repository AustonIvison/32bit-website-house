# 🎮 32-Bit Pokémon Gym Website

A browser-based Pokémon gym exploration game built with TypeScript, PixiJS, and Vite. Navigate through a rock-type gym, interact with trainers, and challenge Gym Leader Brock!

![Game Screenshot](https://github.com/user-attachments/assets/d346dac5-dfb0-47e3-a02d-98c929b4a397)

## 🌟 Features

### Core Gameplay
- **Tile-based Movement**: Smooth, animated character movement across a 15x12 tile gym
- **Collision Detection**: Realistic physics preventing movement through walls, rocks, and NPCs
- **NPC Interactions**: Talk to 5 different characters including Gym Leader Brock
- **Dialog System**: Multi-line conversations with typewriter effect
- **Keyboard Controls**: 
  - Arrow keys or WASD for movement
  - Space, Enter, or Z to interact with NPCs

### Game Engine Architecture
The project uses a modular game engine with separate systems:
- **InputHandler**: Processes keyboard input and manages interaction state
- **CollisionSystem**: Handles collision detection between player, walls, and NPCs
- **MovementSystem**: Manages smooth tile-to-tile movement animations
- **DialogSystem**: Controls conversation flow with typewriter text animation
- **Renderer**: PixiJS-based rendering system with placeholder graphics

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
# Clone the repository
git clone https://github.com/AustonIvison/32bit-website-house.git
cd 32bit-website-house

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to play!

### Build for Production
```bash
npm run build
npm run preview
```

## 🎯 How to Play

1. **Movement**: Use Arrow keys or WASD to move your character around the gym
2. **Interact**: Walk up to NPCs and press Space, Enter, or Z to talk to them
3. **Explore**: Navigate through the gym, avoiding rock obstacles to find all trainers
4. **Challenge**: Make your way to Gym Leader Brock at the top of the gym!

## 📁 Project Structure

```
32bit-website-house/
├── src/
│   ├── engine/           # Game engine systems
│   │   ├── input.ts      # Keyboard input handler
│   │   ├── collision.ts  # Collision detection
│   │   ├── movement.ts   # Movement system
│   │   ├── dialog.ts     # Dialog system
│   │   ├── renderer.ts   # PixiJS renderer
│   │   └── types.ts      # TypeScript type definitions
│   ├── data/             # Game content data
│   │   ├── maps/
│   │   │   └── gym.json  # Gym tilemap and collision data
│   │   └── npcs.json     # NPC positions and dialog
│   ├── Game.ts           # Main game orchestrator
│   ├── main.ts           # Application entry point
│   └── style.css         # Styling
├── design-docs/          # Asset creation documentation
│   ├── asset-prompts.md  # Detailed sprite creation guide
│   └── Gym.webp          # Reference image
├── public/               # Static assets
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Graphics

Currently using placeholder graphics (colored circles and rectangles). The game is ready for sprite replacement!

### Sprite Creation Guide
See `design-docs/asset-prompts.md` for detailed instructions on creating:
- Gym floor tiles (rocky texture, light/dark variants)
- Cave wall tiles
- Boulder obstacles
- Player character sprites (4-direction walk cycles)
- NPC trainer sprites (Gym Leader Brock, Hikers, Youngster, Lass)
- Decorative elements (statues, torches, signs)

All sprites should be 32x32 pixels in Pokémon FireRed/LeafGreen GBA style.

## 🎮 NPCs and Dialog

### Gym Leader Brock
*Position: Top center (7, 1)*
- Welcomes challengers and explains the gym's challenge

### Trainer NPCs
- **Hiker Marcus** (3, 4): Blocks the left path, talks about Rock-type Pokémon
- **Youngster Joey** (11, 4): Guards the right side, aspiring future Gym Leader
- **Hiker Boulder** (5, 7): Shares stories about ancient stones from Mt. Moon
- **Lass Petra** (9, 7): Offers encouraging advice about finding your path

## 🛠️ Technical Stack

- **Frontend Framework**: Vite 7.x (rolldown-vite)
- **Language**: TypeScript 5.9.x
- **Graphics Library**: PixiJS 8.14.x
- **Build System**: Vite with TypeScript compilation
- **Code Style**: ES Modules with modern TypeScript features

## 📦 Dependencies

### Runtime
- `pixi.js` ^8.14.3 - 2D WebGL rendering engine

### Development
- `typescript` ~5.9.3 - TypeScript compiler
- `vite` (rolldown-vite) 7.2.5 - Build tool and dev server

## 🎯 Roadmap / Future Enhancements

- [ ] Replace placeholder graphics with pixel art sprites
- [ ] Add background music and sound effects
- [ ] Implement battle system when challenging trainers
- [ ] Add more rooms and multiple gyms
- [ ] Pokémon party system
- [ ] Save/load game state
- [ ] Mobile touch controls
- [ ] Animated sprite walking cycles
- [ ] Map transitions and doorways

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🎮 Credits

Inspired by Pokémon FireRed/LeafGreen gym design. This is a fan project for educational and entertainment purposes.

---

**Play now and become a Pokémon Master!** 🏆
