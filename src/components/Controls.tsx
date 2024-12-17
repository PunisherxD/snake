import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { Direction } from '../types/game';

type ControlsProps = {
  onDirectionChange: (direction: Direction) => void;
  onPauseToggle: () => void;
  isPaused: boolean;
};

export const Controls: React.FC<ControlsProps> = ({ 
  onDirectionChange, 
  onPauseToggle, 
  isPaused 
}) => {
  return (
    <div className="mt-8 select-none">
      <div className="grid grid-cols-3 gap-2 w-48 mx-auto">
        <div className="col-start-2">
          <button
            className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
            onClick={() => onDirectionChange('UP')}
          >
            <ArrowUp className="w-8 h-8 text-white" />
          </button>
        </div>
        <div className="col-start-1 row-start-2">
          <button
            className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
            onClick={() => onDirectionChange('LEFT')}
          >
            <ArrowLeft className="w-8 h-8 text-white" />
          </button>
        </div>
        <div className="col-start-2 row-start-2">
          <button
            className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
            onClick={onPauseToggle}
          >
            {isPaused ? (
              <Play className="w-8 h-8 text-white" />
            ) : (
              <Pause className="w-8 h-8 text-white" />
            )}
          </button>
        </div>
        <div className="col-start-3 row-start-2">
          <button
            className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
            onClick={() => onDirectionChange('RIGHT')}
          >
            <ArrowRight className="w-8 h-8 text-white" />
          </button>
        </div>
        <div className="col-start-2 row-start-3">
          <button
            className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
            onClick={() => onDirectionChange('DOWN')}
          >
            <ArrowDown className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};