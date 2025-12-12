import { Box, Text, useInput } from 'ink';
import React from 'react';
import { ACCOMPLISHMENTS, GAME_HEIGHT, GAME_WIDTH, ISLAND_DISTANCE } from './types.js';
import { useGame } from './useGame.js';

export function Game() {
  const { gameState, movePlayer, startNextLevel } = useGame();

  useInput((input, key) => {
    if (gameState.gameStatus === 'celebrating') {
      if (input === ' ') {
        startNextLevel();
      }
      return;
    }

    if (gameState.gameStatus === 'playing') {
      if (key.leftArrow) {
        movePlayer('left');
      } else if (key.rightArrow) {
        movePlayer('right');
      } else if (key.upArrow) {
        movePlayer('up');
      } else if (key.downArrow) {
        movePlayer('down');
      }
    }
  });

  if (gameState.gameStatus === 'celebrating') {
    return <CelebrationScreen level={gameState.level} score={gameState.score} />;
  }

  if (gameState.gameStatus === 'gameOver') {
    return <GameOverScreen level={gameState.level} score={gameState.score} message={gameState.gameOverMessage} />;
  }

  // Build the game grid
  const grid: string[][] = Array(GAME_HEIGHT)
    .fill(null)
    .map(() => Array(GAME_WIDTH).fill(' '));

  // Add obstacles
  gameState.obstacles.forEach(obs => {
    if (
      obs.position.y >= 0 &&
      obs.position.y < GAME_HEIGHT &&
      obs.position.x >= 0 &&
      obs.position.x < GAME_WIDTH
    ) {
      grid[obs.position.y][obs.position.x] = obs.type === 'rock' ? '🗿' : '🌊';
    }
  });

  // Add player (boat)
  if (
    gameState.playerPosition.y >= 0 &&
    gameState.playerPosition.y < GAME_HEIGHT
  ) {
    grid[gameState.playerPosition.y][gameState.playerPosition.x] = '🚣';
  }

  const progressPercent = Math.floor(
    (gameState.distanceToIsland / ISLAND_DISTANCE) * 100
  );

  return (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor="cyan" flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Text color="yellow" bold>
            ROW TO MOBILE ISLAND
          </Text>
        </Box>

        <Box marginBottom={1}>
          <Text>Level: <Text color="green">{gameState.level}</Text></Text>
          <Text> | </Text>
          <Text>Score: <Text color="yellow">{gameState.score}</Text></Text>
          <Text> | </Text>
          <Text>Progress: <Text color="cyan">{progressPercent}%</Text></Text>
        </Box>

        <Box flexDirection="row">
          <Box flexDirection="column" alignItems="center">
            <Box borderStyle="single" borderColor="blue" flexDirection="column">
              {grid.map((row, i) => (
                <Box key={i}>
                  {row.map((cell, j) => (
                    <Box key={j} width={2}>
                      <Text color={'white'}>{cell}</Text>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>

          <Box marginLeft={2} flexDirection="column">
            <Box marginBottom={1}>
              <Text color="cyan" bold>  🌴  </Text>
            </Box>
            <Box flexDirection="column" width={8} height={GAME_HEIGHT}>
              {Array(GAME_HEIGHT).fill(null).map((_, i) => {
                const rowProgress = ((GAME_HEIGHT - i) / GAME_HEIGHT) * 100;
                const isFilled = progressPercent >= rowProgress;
                return (
                  <Box key={i} justifyContent="center">
                    <Text color={isFilled ?  'gray': 'cyan'}>
                      {isFilled ? '░░░░░' :  '█████'}
                    </Text>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        <Box marginTop={1}>
          <Text dimColor>Use arrow keys to move • Dodge obstacles (🗿 🌊) • Reach the island!</Text>
        </Box>
      </Box>
    </Box>
  );
}

function CelebrationScreen({ level, score }: { level: number; score: number }) {
  const accomplishmentIndex = (level - 1) % ACCOMPLISHMENTS.length;
  const accomplishment = ACCOMPLISHMENTS.at(accomplishmentIndex);

  return (
    <Box flexDirection="column" padding={2}>
      <Box borderStyle="double" borderColor="green" flexDirection="column" padding={2}>
        <Box justifyContent="center" marginBottom={1}>
          <Text color="green" bold>
            🎉  YOU REACHED MOBILE ISLAND!  🎉
          </Text>
        </Box>

        <Box justifyContent="center" marginY={1}>
          <Text color="yellow">Level {level} Complete!</Text>
        </Box>

        <Box justifyContent="center" marginBottom={2}>
          <Text>Total Score: <Text color="cyan" bold>{score}</Text></Text>
        </Box>

        <Box justifyContent="center" marginY={1}>
          <Text color="magenta" bold>Accomplishment Unlocked:</Text>
        </Box>

        <Box justifyContent="center" marginBottom={2}>
          <Text color="white">🤩 {accomplishment}</Text>
        </Box>

        <Box justifyContent="center" marginY={1}>
          <Text>Your friends are celebrating with you:</Text>
        </Box>

        <Box justifyContent="center" marginY={1}>
          <Text color="magenta">👋 Cooper</Text>
          <Text>  </Text>
          <Text color="blue">👋 Leslie</Text>
          <Text>  </Text>
          <Text color="cyan">👋 Ariane</Text>
        </Box>

        <Box justifyContent="center" marginTop={2}>
          <Text dimColor>Press SPACE to continue to Level {level + 1}</Text>
        </Box>
      </Box>
    </Box>
  );
}

function GameOverScreen({ level, score, message }: { level: number; score: number; message?: string }) {
  return (
    <Box flexDirection="column" padding={2}>
      <Box borderStyle="round" borderColor="red" flexDirection="column" padding={2}>
        <Box justifyContent="center" marginBottom={1}>
          <Text color="red" bold>
            💥  GAME OVER  💥
          </Text>
        </Box>

        <Box justifyContent="center" marginY={1} marginX={2}>
          <Text color="yellow">{message || "You hit an obstacle!"}</Text>
        </Box>

        <Box justifyContent="center" marginY={1}>
          <Text>Reached Level: <Text color="yellow">{level}</Text></Text>
        </Box>

        <Box justifyContent="center" marginBottom={2}>
          <Text>Final Score: <Text color="cyan" bold>{score}</Text></Text>
        </Box>

        <Box justifyContent="center" marginTop={1}>
          <Text dimColor>Thanks for playing! Press Ctrl+C to exit</Text>
        </Box>
      </Box>
    </Box>
  );
}