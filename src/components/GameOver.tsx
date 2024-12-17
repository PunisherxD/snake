import React from 'react';

type GameOverProps = {
  score: number;
  onRestart: () => void;
};

export const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="text-center p-8 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
        <p className="text-xl text-white mb-6">Final Score: {score}</p>
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};