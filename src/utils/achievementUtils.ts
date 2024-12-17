import { Achievement, GameState } from '../types/game';
import { ACHIEVEMENTS } from '../config/gameConfig';

export const initializeAchievements = (): Achievement[] => {
  return ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    unlocked: false,
    progress: 0,
  }));
};

export const checkAchievements = (state: GameState): Achievement[] => {
  return state.achievements.map(achievement => {
    let progress = achievement.progress;
    let unlocked = achievement.unlocked;

    switch (achievement.id) {
      case 'speed-demon':
        if (state.speed <= 50) {
          progress = 1;
          unlocked = true;
        }
        break;
      case 'combo-master':
        if (state.combo >= 5) {
          progress = state.combo;
          unlocked = true;
        }
        break;
      case 'survivor':
        if (state.gameMode === 'SURVIVAL' && !state.isGameOver) {
          progress = Math.floor((Date.now() - state.lastFoodEatenTime) / 1000);
          unlocked = progress >= 120;
        }
        break;
    }

    return { ...achievement, progress, unlocked };
  });
};