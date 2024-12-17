import { Position, Hazard, Direction } from '../types/game';
import { GRID_SIZE } from '../config/gameConfig';

export const generateHazard = (snake: Position[], food: Position): Hazard => {
  const types: Hazard['type'][] = ['POISON', 'MOVING_WALL'];
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

  const directions: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
  const moveDirection = directions[Math.floor(Math.random() * directions.length)];

  return {
    position,
    type: randomType,
    moveDirection: randomType === 'MOVING_WALL' ? moveDirection : undefined,
  };
};

export const moveHazards = (hazards: Hazard[]): Hazard[] => {
  return hazards.map(hazard => {
    if (hazard.type !== 'MOVING_WALL' || !hazard.moveDirection) return hazard;

    const newPosition = { ...hazard.position };
    switch (hazard.moveDirection) {
      case 'UP':
        newPosition.y = ((newPosition.y - 1 + GRID_SIZE) % GRID_SIZE);
        break;
      case 'DOWN':
        newPosition.y = ((newPosition.y + 1) % GRID_SIZE);
        break;
      case 'LEFT':
        newPosition.x = ((newPosition.x - 1 + GRID_SIZE) % GRID_SIZE);
        break;
      case 'RIGHT':
        newPosition.x = ((newPosition.x + 1) % GRID_SIZE);
        break;
    }

    return { ...hazard, position: newPosition };
  });
};