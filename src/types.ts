export interface Position {
  x: number;
  y: number;
}

export interface Obstacle {
  id: number;
  position: Position;
  // type: 'apple-rejection' | 'google-rejection' | 'upgrade-streamchat';
  type: 'rock' | 'wave' | 'shark'
}

export interface GameState {
  playerPosition: Position;
  obstacles: Obstacle[];
  level: number;
  score: number;
  gameStatus: 'playing' | 'celebrating' | 'gameOver';
  distanceToIsland: number;
}

export const GAME_WIDTH = 40;
export const GAME_HEIGHT = 20;
export const ISLAND_DISTANCE = 100;