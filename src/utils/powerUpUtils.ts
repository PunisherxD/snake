import { Position, PowerUp, PowerUpType } from '../types/game';
import { GRID_SIZE, POWER_UP_DURATION } from '../config/gameConfig';

export const generatePowerUp = (snake: Position[], food: Position): PowerUp => {
  const types: PowerUpType[] = ['FREEZE', 'SHRINK', 'SHIELD', 'SPEED', 'DOUBLE_POINTS'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  
  let position: Position;
  do {
    position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (
    snake.some(segment => segment.x === position.x && segment.y === position.y) ||
    (food.x === position.x && food.y === position.y)
  );

  return {
    position,
    type: randomType,
    expiresAt: Date.now() + POWER_UP_DURATION
  };
};

export const getPowerUpColor = (type: PowerUpType): string => {
  switch (type) {
    case 'FREEZE':
      return 'bg-blue-400';
    case 'SHIELD':
      return 'bg-yellow-400';
    case 'SHRINK':
      return 'bg-purple-400';
    case 'SPEED':
      return 'bg-green-400';
    case 'DOUBLE_POINTS':
      return 'bg-red-400';
    default:
      return 'bg-white';
  }
};