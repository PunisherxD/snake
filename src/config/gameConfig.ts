export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
export const INITIAL_SPEED = 200;
export const MIN_SPEED = 50;
export const SPEED_DECREASE_RATE = 5;
export const INITIAL_POSITION = { x: 10, y: 10 };
export const SCORE_INCREMENT = 10;
export const POWER_UP_DURATION = 5000;
export const BONUS_DURATION = 5000; // Adding the missing constant
export const BONUS_SPAWN_INTERVAL = 5;
export const COMBO_TIMEOUT = 3000;
export const TIME_ATTACK_DURATION = 120000; // 2 minutes

export const POWER_UP_POINTS = {
  SPEED: 20,
  DOUBLE_POINTS: 30,
};

export const BONUS_POINTS = {
  SPEED: 20,
  DOUBLE_POINTS: 30,
};

export const ACHIEVEMENTS = [
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Reach maximum speed',
    target: 1,
  },
  {
    id: 'combo-master',
    name: 'Combo Master',
    description: 'Get a 5x combo',
    target: 5,
  },
  {
    id: 'survivor',
    name: 'Survivor',
    description: 'Survive for 2 minutes in survival mode',
    target: 120,
  },
];