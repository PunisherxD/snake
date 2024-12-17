export type Position = {
  x: number;
  y: number;
};

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type GameMode = 'CLASSIC' | 'ENDLESS';

export type BonusType = 'SPEED' | 'DOUBLE_POINTS';
export type PowerUpType = 'SPEED' | 'DOUBLE_POINTS';

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
  timeLeft?: number;
  combo: number;
  lastFoodEatenTime: number;
  achievements: Achievement[];
  level?: number;
};