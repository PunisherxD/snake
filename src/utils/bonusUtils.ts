import { Position, BonusItem, BonusType } from '../types/game';
import { GRID_SIZE, BONUS_DURATION } from '../config/gameConfig';

export const generateBonusItem = (snake: Position[], food: Position): BonusItem => {
  const types: BonusType[] = ['SPEED', 'DOUBLE_POINTS'];
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
    expiresAt: Date.now() + BONUS_DURATION
  };
};

export const getBonusColor = (type: BonusType): string => {
  switch (type) {
    case 'SPEED':
      return 'bg-yellow-400';
    case 'DOUBLE_POINTS':
      return 'bg-purple-400';
    default:
      return 'bg-white';
  }
};