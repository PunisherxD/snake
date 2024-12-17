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
    </div>
  );
};