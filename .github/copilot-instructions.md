## 1) Define scope & content
- Map layout: Size, collision tiles (walls, rocks, statues, NPCs), walkable tiles.
- NPCs: Number, locations, dialog scripts (multi-line sequences).
- Player: Starting position, sprite facing directions (up/down/left/right).
- Interactions: Talk to NPC on “Enter/Space/Z” when facing them; optional trigger on proximity.
- Objectives: Pure exploration + dialog, or small quests? (e.g., fetch item, trigger text after event).

## 2) Choose stack & approach
- Rendering: Web canvas (e.g., PixiJS) or HTML+CSS with absolutely positioned sprites; canvas is smoother for tile maps.
- Input: Keyboard arrow keys (add WASD optional). Prevent default scroll.
- Assets: Use 16×16 or 32×32 tiles; slice a tileset and spritesheet. Create a sprite atlas for player + NPCs.
- State management: Simple JS objects for player position, facing, map collision grid, NPC definitions, and dialog state.
- Dialog UI: Lightweight modal or speech box anchored to bottom; typewriter effect optional.
- Audio (optional): Loop background music + short SFX; allow mute toggle.

## 3) Map & tiles
- Build a tilemap JSON: 2D array of tile IDs; a parallel collision layer (true/false).
- Parallax/background: Single layer is fine; add overlay for walls/roof edges.
- Lighting/ambience (optional): Subtle vignette or shadow overlay for depth.

## 4) Sprites & art pipeline
- Tileset: Derive from Pokémon‑style gym tiles (floor, rocks, statues, walls).
- Player/NPC sprites: 4-directional walk cycles (2–3 frames per direction).
- Export as a spritesheet with frame metadata (width/height/frame count).
- Slice with a simple atlas JSON; load via PixiJS or manual drawImage.

## 5) Core mechanics
- Movement loop: On keydown, attempt step; check collision grid; move tile-by-tile (e.g., 16px per step) with tweened animation.
- Facing: Update facing even if blocked (so dialog works when standing next to NPC).
- Camera: Fixed viewport (like the gym) or small follow if map larger than view.
- Collision: Rocks/statues/walls/NPCs are non-walkable; floor is walkable.
- Interaction: When facing an NPC and adjacent, pressing interaction key opens dialog box; lock movement while dialog is open.

## 6) Dialog system
- Data: NPC objects with `id`, `name`, `position`, `facing`, `script: string[]`.
- Sequencing: Advance with Enter/Space/Z; close on end.
- Optional branching: Choices array; effects on flags.
- Optional conditions: Gate lines based on flags (e.g., after talking to leader).

## 7) Content authoring
- Create a small YAML/JSON for NPC placement and dialog:
  - Positions (tile coords), facing direction.
  - Dialog lines; optional expressions or emotes.
- Create a map definition file for tiles and collision.

## 8) UI polish
- Dialog box: Pixel frame, monospace/pixel font, 2–3 lines visible; text advance indicator.
- HUD (optional): Mute button, instructions overlay (“Arrow keys to move, Space to talk”).
- Transitions: Fade-in on load; small bump animation on blocked move.

## 9) Performance & accessibility
- Keep textures small; batch draw calls (PixiJS auto-batching).
- Input: Ensure focus stays on canvas; prevent page scroll on arrows.
- Accessibility: Provide keyboard-only flow (already primary); add a toggle to show dialog history or an accessible text log.
- Mobile: Optional virtual d-pad; otherwise desktop-first.

## 10) Build & packaging
- Tooling: Vite + TypeScript; eslint/prettier.
- Structure:
  - `assets/tileset.png`, `assets/spritesheet.png`
  - `maps/gym.json` (tiles + collision)
  - `data/npcs.json` (positions, dialog)
  - `src/engine/` (input, movement, collision, renderer, dialog)
  - `src/ui/DialogBox.tsx` or canvas-based overlay
  - `src/main.ts` bootstrap
- Commands: `npm create vite@latest`, add PixiJS (or stick to CanvasRenderingContext2D).

## 11) Milestones
1) Skeleton: Canvas + arrow key input; draw placeholder tiles; move player without collisions.
2) Collision + map: Load map JSON; implement blocked tiles; proper facing.
3) Sprites: Load atlas; animate walk cycles per direction.
4) NPCs + dialog: Place NPCs; interaction key opens dialog box; lock movement while open.
5) Polish: Typewriter effect, text advance indicator, mute toggle, instructions overlay.
6) QA: Test collision edges, dialog sequencing, focus, and performance in Chrome/Firefox/Safari.
7) Deploy: Static host (Netlify/Vercel/GitHub Pages); pre-load assets to avoid pop-in.

## 12) Nice-to-haves
- Trigger tiles (doorways) for room transitions or fade-outs.
- Simple quest flags (talk-to-NPC order).
- Idle animations (breathing/blink).
- Day/night tint overlay.
- Save state via localStorage (flags + position).

## 13) Delivery checklist
- Runs in latest Chrome/Firefox/Safari.
- Arrow keys/WASD move; Space/Enter talks.
- Collisions prevent walking through rocks/statues/NPCs.
- Dialog box works and locks movement until closed.
- Assets preloaded; instructions visible on load.
- Deployed URL plus source code.