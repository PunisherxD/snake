import React from 'react';
import { GameMode } from '../types/game';

type GameModeSelectProps = {
  onSelect: (mode: GameMode) => void;
};

export const GameModeSelect: React.FC<GameModeSelectProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      <button
        onClick={() => onSelect('CLASSIC')}
        className="px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <h3 className="text-xl font-bold mb-2">Classic Mode</h3>
        <p className="text-sm">Traditional snake game with walls</p>
      </button>
      <button
        onClick={() => onSelect('ENDLESS')}
        className="px-6 py-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        <h3 className="text-xl font-bold mb-2">Endless Mode</h3>
        <p className="text-sm">No walls, wrap around edges</p>
      </button>
      <button
        onClick={() => onSelect('TIME_ATTACK')}
        className="px-6 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
      >
        <h3 className="text-xl font-bold mb-2">Time Attack</h3>
        <p className="text-sm">Score as much as possible in 2 minutes</p>
      </button>
      <button
        onClick={() => onSelect('SURVIVAL')}
        className="px-6 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        <h3 className="text-xl font-bold mb-2">Survival Mode</h3>
        <p className="text-sm">Dodge hazards while collecting food</p>
      </button>
    </div>
  );
};