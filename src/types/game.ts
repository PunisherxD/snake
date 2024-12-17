export type Position = {
  x: number;
  y: number;
};

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type GameMode = 'CLASSIC' | 'ENDLESS' | 'TIME_ATTACK' | 'SURVIVAL';

export type BonusType = 'SPEED' | 'DOUBLE_POINTS' | 'SHRINK';
export type PowerUpType = 'FREEZE' | 'SHRINK' | 'SHIELD' | 'SPEED' | 'DOUBLE_POINTS';
export type HazardType = 'POISON' | 'MOVING_WALL';

export type BonusItem = {
  position: Position;
  type: BonusType;
  expiresAt: number;
};

export type PowerUp = {
  position: Position;
  type: PowerUpType;
  expiresAt: number;
};

export type Hazard = {
  position: Position;
  type: HazardType;
  moveDirection?: Direction;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  progress: number;
  target: number;
};

export type GameState = {
  snake: Position[];
  food: Position;
  direction: Direction;
  isGameOver: boolean;
  score: number;
  isPaused: boolean;
  gameMode: GameMode;
  speed: number;
  foodEaten: number;
  bonusItem: BonusItem | null;
  activeEffects: Set<BonusType | PowerUpType>;
  hazards: Hazard[];
  timeLeft?: number;
  combo: number;
  lastFoodEatenTime: number;
  achievements: Achievement[];
  level?: number;
};