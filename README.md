# CLI Game for Kirat

## Spec

- 1 player cli game
- The player can move up, down, left, and right
- The aim of the game is to row across the ocean, dodging obstacles to reach Mobile Island
- The game is infinite, each time the player reaches Mobile Island, they level up and their speed increases
- Before the player initiates the next level, they get to celebrate with their friends Cooper, Leslie, and Ariane on Mobile Island

## Installation

### For Users (Mac only)

Install via curl:

```bash
curl -fsSL https://raw.githubusercontent.com/afairlie/cli-game/main/install.sh | bash
```

Then run the game:

```bash
row-kirat-row
```

### For Developers

1. Install Bun (if not already installed):
   ```bash
   brew install bun
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   bun run dev
   ```

4. Build standalone executable:
   ```bash
   bun run build:macos
   ```
   This creates a `row-kirat-row` executable that can run without Bun installed.

## How to Play

- Use **arrow keys** to move your boat (▲)
- Dodge obstacles: rocks (◆) and waves (~)
- Reach Mobile Island (🏝️) at the top
- Each level increases the speed
- Celebrate with Cooper, Leslie, and Ariane when you reach the island
- Press **SPACE** to start the next level
- Press **Ctrl+C** to quit

## Distribution

To distribute this game:

1. Build the executable:
   ```bash
   bun run build:macos
   ```

2. Create a GitHub release and upload the `row-kirat-row` binary

3. Update `install.sh` with your GitHub username

4. Users can then install with:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/YOUR_USERNAME/cli-game/main/install.sh | bash
   ```