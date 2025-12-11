import { useCallback, useEffect, useState } from 'react';
import { GAME_HEIGHT, GAME_WIDTH, GameState, ISLAND_DISTANCE, Obstacle } from './types.js';

export function useGame() {
  const [gameState, setGameState] = useState<GameState>({
    playerPosition: { x: Math.floor(GAME_WIDTH / 2), y: GAME_HEIGHT - 2 },
    obstacles: [],
    level: 1,
    score: 0,
    gameStatus: 'playing',
    distanceToIsland: 0,
  });

  const [obstacleIdCounter, setObstacleIdCounter] = useState(0);

  // Move player
  const movePlayer = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    setGameState(prev => {
      if (prev.gameStatus !== 'playing') return prev;

      const newPosition = { ...prev.playerPosition };

      switch (direction) {
        case 'left':
          newPosition.x = Math.max(0, newPosition.x - 1);
          break;
        case 'right':
          newPosition.x = Math.min(GAME_WIDTH - 1, newPosition.x + 1);
          break;
        case 'up':
          newPosition.y = Math.max(0, newPosition.y - 1);
          break;
        case 'down':
          newPosition.y = Math.min(GAME_HEIGHT - 1, newPosition.y + 1);
          break;
      }

      return { ...prev, playerPosition: newPosition };
    });
  }, []);

  // Start next level
  const startNextLevel = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      level: prev.level + 1,
      gameStatus: 'playing',
      distanceToIsland: 0,
      obstacles: [],
      playerPosition: { x: Math.floor(GAME_WIDTH / 2), y: GAME_HEIGHT - 2 },
    }));
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return;

    const speed = Math.max(100, 300 - (gameState.level - 1) * 20);
    const interval = setInterval(() => {
      setGameState(prev => {
        // Move obstacles down (simulating player moving forward)
        const movedObstacles = prev.obstacles
          .map(obs => ({
            ...obs,
            position: { ...obs.position, y: obs.position.y + 1 },
          }))
          .filter(obs => obs.position.y < GAME_HEIGHT);

        // Add new obstacles occasionally
        const newObstacles = [...movedObstacles];
        if (Math.random() < 0.3) {
          const newObstacle: Obstacle = {
            id: obstacleIdCounter,
            position: {
              x: Math.floor(Math.random() * GAME_WIDTH),
              y: 0,
            },
            type: Math.random() < 0.5 ? 'rock' : 'wave',
          };
          newObstacles.push(newObstacle);
          setObstacleIdCounter(c => c + 1);
        }

        // Check collision
        const collision = newObstacles.some(
          obs =>
            obs.position.x === prev.playerPosition.x &&
            obs.position.y === prev.playerPosition.y
        );

        if (collision) {
          return { ...prev, gameStatus: 'gameOver' };
        }

        // Update distance and check if reached island
        const newDistance = prev.distanceToIsland + 1;
        if (newDistance >= ISLAND_DISTANCE) {
          return {
            ...prev,
            obstacles: newObstacles,
            distanceToIsland: newDistance,
            gameStatus: 'celebrating',
            score: prev.score + prev.level * 100,
          };
        }

        return {
          ...prev,
          obstacles: newObstacles,
          distanceToIsland: newDistance,
        };
      });
    }, speed);

    return () => clearInterval(interval);
  }, [gameState.gameStatus, gameState.level, obstacleIdCounter]);

  return {
    gameState,
    movePlayer,
    startNextLevel,
  };
}