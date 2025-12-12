# A CLI Game for Kirat

<img width="1135" height="512" alt="Screenshot 2025-12-12 at 9 56 34 AM" src="https://github.com/user-attachments/assets/35899638-ef66-4fe9-8f3d-f13a6ee998b2" />


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
curl -fsSL https://raw.githubusercontent.com/afairlie/mobile-island/main/install.sh | bash
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
   bun install
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

- Use **arrow keys** to move your boat (🚣)
- Dodge obstacles: rocks (🗿) and waves (🌊)
- Reach Mobile Island (🌴) at the top
- Each level increases the speed
- Celebrate with Cooper, Leslie, and Ariane when you reach the island
- Press **SPACE** to start the next level
- Press **Ctrl+C** to quit

## Distribution

### To distribute this game

Prerequisites:
- Make sure `install.sh` points to your repo
- You've pushed the latest install script to main
- The repo is public

1. Build the executable:
   ```bash
   bun run build:macos
   ```
   
2. Install gh cli
   ```bash
   brew install gh
   gh auth login
   ```

3. Create a GitHub release and upload the `row-kirat-row` binary
   ```bash
   # run interactive release
   bun run release
   ```

4. Users can then install with:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/YOUR_REPO/main/install.sh | bash
   ```
