import { Position, Direction, GameMode } from '../types/game';
import { GRID_SIZE } from '../config/gameConfig';

export const generateRandomFood = (snake: Position[]): Position => {
  let newFood: Position;
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  
  return newFood;
};

export const checkCollision = (head: Position, snake: Position[], gameMode: GameMode): boolean => {
  if (gameMode === 'ENDLESS') {
    // Only check self collision in endless mode
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
  }

  // Classic mode: Check wall and self collision
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    return true;
  }
  return snake.some(segment => segment.x === head.x && segment.y === head.y);
};

export const getNextHead = (currentHead: Position, direction: Direction, gameMode: GameMode): Position => {
  const head = { ...currentHead };
  
  switch (direction) {
    case 'UP':
      head.y -= 1;
      break;
    case 'DOWN':
      head.y += 1;
      break;
    case 'LEFT':
      head.x -= 1;
      break;
    case 'RIGHT':
      head.x += 1;
      break;
  }

  if (gameMode === 'ENDLESS') {
    // Wrap around in endless mode
    head.x = ((head.x % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
    head.y = ((head.y % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
  }
  
  return head;
};