# Pokemon Gym Asset Creation Prompts

Use these prompts with an image generation LLM (Midjourney, DALL-E, Stable Diffusion, etc.) to create the pixel art assets for the Rock Gym. All assets should be **32x32 pixels** unless otherwise specified.

---

## 🎨 STYLE GUIDE (Include with every prompt)

**Base Style Prefix:**
```
Pokemon FireRed/LeafGreen GBA style, 32x32 pixel art, top-down perspective, limited color palette, clean pixel edges, no anti-aliasing, retro game aesthetic
```

---

## 🏛️ TILESET ASSETS

### Tile 1: Rocky Floor (Light)
```
Pokemon GBA style, 32x32 pixel art tileset tile, top-down view.
Light brown/tan rocky cave floor texture, subtle stone cracks and grain pattern.
Seamlessly tileable, flat perspective suitable for walking surface.
Colors: sandy brown (#c4a35a), tan (#d4b896), light gray stone accents.
Reference: Brock's Pewter City Gym floor from Pokemon FireRed.
```

### Tile 2: Rocky Floor (Dark)
```
Pokemon GBA style, 32x32 pixel art tileset tile, top-down view.
Dark brown/gray rocky cave floor texture, subtle stone cracks and shadowed areas.
Seamlessly tileable, flat perspective suitable for walking surface.
Colors: dark brown (#8b7355), gray-brown (#6b5344), shadow accents.
Should contrast with light floor tile for checkerboard pattern.
Reference: Brock's Pewter City Gym floor from Pokemon FireRed.
```

### Tile 3: Cave Wall (Top Edge)
```
Pokemon GBA style, 32x32 pixel art tileset tile, top-down view.
Dark gray rocky cave wall, jagged stone texture with depth shading.
This is the TOP edge of the wall (player cannot walk here).
Colors: dark gray (#4a4a4a), charcoal (#2d2d2d), black shadows (#1a1a1a).
Should have 3D depth illusion showing wall height.
Reference: Pokemon cave walls from Rock Tunnel or Mt. Moon.
```

### Tile 4: Cave Wall (Side/Corner Variants)
```
Pokemon GBA style, 32x32 pixel art tileset tile, top-down view.
Dark gray rocky cave wall corner and side pieces.
Create a 4-tile set: left edge, right edge, top-left corner, top-right corner.
Seamlessly connects with top wall tile.
Colors: dark gray (#4a4a4a), charcoal (#2d2d2d), black shadows.
Reference: Pokemon cave interior walls.
```

### Tile 5: Large Boulder/Rock Obstacle
```
Pokemon GBA style, 32x32 pixel art, top-down view.
Large gray boulder obstacle that blocks player movement.
Rounded rocky shape with highlight on top-left, shadow on bottom-right.
Should look like it's sitting on the floor (slight shadow underneath).
Colors: medium gray (#7a7a7a), light gray highlight (#9a9a9a), dark shadow (#4a4a4a).
Reference: Strength boulders from Pokemon caves.
```

### Tile 6: Small Rock Cluster
```
Pokemon GBA style, 32x32 pixel art, top-down view.
Cluster of 2-3 small rocks/stones as floor decoration or obstacle.
Natural scattered arrangement, varying sizes.
Colors: brown-gray tones matching cave floor palette.
Can be walkable decoration or blocking obstacle depending on placement.
```

### Tile 7: Gym Leader Platform/Pedestal
```
Pokemon GBA style, 32x32 pixel art, top-down view.
Elevated stone platform or pedestal where gym leader stands.
Rectangular raised surface with carved stone edges.
Ornate but rocky design, maybe with subtle pattern or badge emblem.
Colors: dark stone with gold/bronze accent trim.
Reference: Gym leader battle platforms from Pokemon games.
```

### Tile 8: Gym Entrance Mat/Doorway
```
Pokemon GBA style, 32x32 pixel art, top-down view.
Gym entrance floor tile or welcome mat area.
Could be a different colored stone or actual mat texture.
Indicates the entrance/exit point of the gym.
Colors: darker brown or red-brown to stand out from main floor.
```

### Tile 9: Decorative Stone Statue Base
```
Pokemon GBA style, 32x32 pixel art, top-down view.
Stone pedestal or statue base (for rock/fossil statue).
Square carved stone base with simple geometric pattern.
This is the base only - statue sprite goes on top as separate layer.
Colors: gray stone with slight blue-gray tint.
```

### Tile 10: Gym Badge Display/Podium
```
Pokemon GBA style, 32x32 pixel art, top-down view.
Small display podium showing the Boulder Badge.
Glass case or stone pedestal with golden badge visible.
Decorative element near gym leader area.
Colors: stone gray base, gold badge, glass shine effect.
```

---

## 👤 CHARACTER SPRITES

### Player Character (4-Direction Spritesheet)
```
Pokemon GBA style pixel art spritesheet, 32x32 per frame.
Young Pokemon trainer character (Red/protagonist style).
Create 12 frames total: 3 frames each for UP, DOWN, LEFT, RIGHT.
Frame 1: Standing idle
Frame 2: Walking step 1 (left foot forward)  
Frame 3: Walking step 2 (right foot forward)
Character wears: red cap, blue jacket, jeans, sneakers.
Top-down 3/4 perspective matching Pokemon overworld sprites.
Arrange as horizontal spritesheet: 384x32 pixels total (12 frames × 32px).
```

### Gym Leader Brock
```
Pokemon GBA style pixel art spritesheet, 32x32 per frame.
Brock from Pokemon - Rock-type Gym Leader.
Spiky brown hair, squinting eyes, orange/brown vest, green pants.
Muscular build, confident stance.
Create 4 frames: facing UP, DOWN, LEFT, RIGHT (standing pose).
Top-down 3/4 perspective.
Arrange as horizontal spritesheet: 128x32 pixels total.
Reference: Brock's overworld sprite from Pokemon FireRed/LeafGreen.
```

### Hiker NPC Trainer
```
Pokemon GBA style pixel art spritesheet, 32x32 per frame.
Hiker trainer class from Pokemon games.
Bearded man with brown hiking gear, large backpack, hiking boots.
Sturdy/stocky build.
Create 4 frames: facing UP, DOWN, LEFT, RIGHT (standing pose).
Top-down 3/4 perspective.
Arrange as horizontal spritesheet: 128x32 pixels total.
Reference: Hiker trainer sprite from Pokemon FireRed/LeafGreen.
```

### Youngster NPC Trainer
```
Pokemon GBA style pixel art spritesheet, 32x32 per frame.
Youngster trainer class from Pokemon games.
Young boy with shorts, t-shirt, baseball cap.
Energetic/eager pose.
Create 4 frames: facing UP, DOWN, LEFT, RIGHT (standing pose).
Top-down 3/4 perspective.
Arrange as horizontal spritesheet: 128x32 pixels total.
Reference: Youngster trainer sprite from Pokemon games.
```

### Lass NPC Trainer
```
Pokemon GBA style pixel art spritesheet, 32x32 per frame.
Lass trainer class from Pokemon games.
Young girl with dress or skirt, ponytail or short hair.
Cheerful pose.
Create 4 frames: facing UP, DOWN, LEFT, RIGHT (standing pose).
Top-down 3/4 perspective.
Arrange as horizontal spritesheet: 128x32 pixels total.
Reference: Lass trainer sprite from Pokemon games.
```

---

## 🗿 DECORATION SPRITES (Overlay Layer)

### Rock/Fossil Statue
```
Pokemon GBA style, 32x32 or 32x64 pixel art (may be taller than 1 tile).
Decorative stone statue of a fossil Pokemon (Aerodactyl, Kabutops, or Omastar).
Carved gray stone appearance, sitting on pedestal.
Used as gym decoration that blocks movement.
Top-down 3/4 perspective with slight depth.
Reference: Statues in Pokemon museum or gym decorations.
```

### Torch/Lantern (Optional Animation)
```
Pokemon GBA style, 32x32 pixel art.
Wall-mounted torch or standing lantern for cave gym lighting.
Warm orange/yellow flame glow.
Optional: Create 2-3 frame animation for flickering flame.
Provides atmospheric lighting decoration.
```

### Gym Sign
```
Pokemon GBA style, 32x48 pixel art (taller than 1 tile).
Wooden or stone sign post reading "PEWTER GYM" or gym rules.
Positioned near entrance.
Brown wood or gray stone material.
```

---

## 📁 FILE ORGANIZATION

After generating, organize assets as:
```
assets/
├── tileset.png          (All floor/wall tiles in grid: 320x32 or 160x64)
├── player.png           (Player spritesheet: 384x32)
├── npcs/
│   ├── brock.png        (128x32)
│   ├── hiker.png        (128x32)
│   ├── youngster.png    (128x32)
│   └── lass.png         (128x32)
└── decorations/
    ├── statue.png       (32x64)
    ├── torch.png        (32x32 or animated strip)
    └── sign.png         (32x48)
```

---

## 🗺️ MAP UPDATE REQUIREMENTS

After creating tileset, update `src/data/maps/gym.json` to use new tile IDs:

**Proposed Tile ID Mapping:**
| ID | Tile |
|----|------|
| 0 | Rocky floor (light) |
| 1 | Rocky floor (dark) |
| 2 | Cave wall (top) |
| 3 | Cave wall (left) |
| 4 | Cave wall (right) |
| 5 | Cave wall (corner TL) |
| 6 | Cave wall (corner TR) |
| 7 | Boulder obstacle |
| 8 | Gym leader platform |
| 9 | Entrance mat |
| 10 | Statue base |

---

## ✅ PRIORITY ORDER

1. **Rocky floor tiles (light + dark)** - Most visible, covers entire floor
2. **Cave wall tiles** - Defines gym boundaries
3. **Boulder obstacles** - Core gameplay element
4. **Player sprite** - Essential for gameplay
5. **Gym Leader Brock** - Main NPC
6. **Other NPC trainers** - Secondary characters
7. **Decorations** - Polish and atmosphere
