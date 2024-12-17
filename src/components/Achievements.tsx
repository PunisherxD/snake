import React from 'react';
import { Achievement } from '../types/game';
import { Trophy } from 'lucide-react';

type AchievementsProps = {
  achievements: Achievement[];
};

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <div className="fixed top-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg max-w-xs">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <h3 className="text-white font-bold">Achievements</h3>
      </div>
      <div className="space-y-2">
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className={`p-2 rounded ${
              achievement.unlocked ? 'bg-green-900/50' : 'bg-gray-700/50'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">{achievement.name}</span>
              <span className="text-xs text-gray-400">
                {achievement.progress}/{achievement.target}
              </span>
            </div>
            <div className="mt-1 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{
                  width: `${(achievement.progress / achievement.target) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};