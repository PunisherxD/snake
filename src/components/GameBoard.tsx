import React from 'react';
import { Position, BonusItem } from '../types/game';
import { CELL_SIZE, GRID_SIZE } from '../config/gameConfig';
import { getBonusColor } from '../utils/bonusUtils';

type GameBoardProps = {
  snake: Position[];
  food: Position;
  bonusItem: BonusItem | null;
  gameMode: 'CLASSIC' | 'ENDLESS';
};

export const GameBoard: React.FC<GameBoardProps> = ({ 
  snake, 
  food, 
  bonusItem,
  gameMode 
}) => {
  return (
    <div 
      className="relative bg-gray-800 border-2 border-gray-700 rounded-lg overflow-hidden"
      style={{
        width: GRID_SIZE * CELL_SIZE,
        height: GRID_SIZE * CELL_SIZE
      }}
    >
      {/* Render snake */}
      {snake.map((segment, index) => {
        const x = ((segment.x % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
        const y = ((segment.y % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
        return (
          <div
            key={index}
            className="absolute bg-green-500 rounded-sm"
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: x * CELL_SIZE,
              top: y * CELL_SIZE,
            }}
          />
        );
      })}

      {/* Render food */}
      <div
        className="absolute bg-red-500 rounded-full"
        style={{
          width: CELL_SIZE - 2,
          height: CELL_SIZE - 2,
          left: food.x * CELL_SIZE,
          top: food.y * CELL_SIZE,
        }}
      />

      {/* Render bonus item */}
      {bonusItem && (
        <div
          className={`absolute ${getBonusColor(bonusItem.type)} rounded-lg animate-pulse`}
          style={{
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
            left: bonusItem.position.x * CELL_SIZE,
            top: bonusItem.position.y * CELL_SIZE,
          }}
        />
      )}

      {/* Game mode indicator */}
      <div className="absolute top-2 right-2 text-xs text-white bg-gray-700 px-2 py-1 rounded">
        {gameMode}
      </div>
    </div>
  );
};