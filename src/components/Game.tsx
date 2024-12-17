import React, { useState, useCallback, useEffect } from 'react';
import { GameBoard } from './GameBoard';
import { Controls } from './Controls';
import { GameOver } from './GameOver';
import { GameModeSelect } from './GameModeSelect';
import { useInterval } from '../hooks/useInterval';
import { generateRandomFood, checkCollision, getNextHead } from '../utils/gameUtils';
import { generateBonusItem } from '../utils/bonusUtils';
import { GameState, Direction, GameMode, BonusItem } from '../types/game';
import {
  INITIAL_POSITION,
  INITIAL_SPEED,
  MIN_SPEED,
  MAX_SPEED,
  SPEED_DECREASE_RATE,
  SCORE_INCREMENT,
  BONUS_SPAWN_INTERVAL,
  BONUS_POINTS
} from '../config/gameConfig';

export default function Game() {
  const [gameState, setGameState] = useState<GameState>({
    snake: [INITIAL_POSITION],
    food: { x: 15, y: 15 },
    direction: 'RIGHT',
    isGameOver: false,
    score: 0,
    isPaused: false,
    gameMode: 'CLASSIC',
    speed: INITIAL_SPEED,
    foodEaten: 0,
    bonusItem: null,
    activeEffects: new Set()
  });

  const [showModeSelect, setShowModeSelect] = useState(true);

  const resetGame = (mode: GameMode = gameState.gameMode) => {
    setGameState({
      snake: [INITIAL_POSITION],
      food: generateRandomFood([INITIAL_POSITION]),
      direction: 'RIGHT',
      isGameOver: false,
      score: 0,
      isPaused: false,
      gameMode: mode,
      speed: INITIAL_SPEED,
      foodEaten: 0,
      bonusItem: null,
      activeEffects: new Set()
    });
    setShowModeSelect(false);
  };

  const handleGameMode = (mode: GameMode) => {
    resetGame(mode);
  };

  const moveSnake = useCallback(() => {
    if (gameState.isPaused || gameState.isGameOver) return;

    setGameState(prevState => {
      const newHead = getNextHead(prevState.snake[0], prevState.direction, prevState.gameMode);
      
      if (checkCollision(newHead, prevState.snake, prevState.gameMode)) {
        return { ...prevState, isGameOver: true };
      }

      const newSnake = [newHead, ...prevState.snake];
      let newFood = prevState.food;
      let newScore = prevState.score;
      let newSpeed = prevState.speed;
      let newFoodEaten = prevState.foodEaten;
      let newBonusItem = prevState.bonusItem;
      const newActiveEffects = new Set(prevState.activeEffects);

      // Check for expired effects
      if (newBonusItem && Date.now() > newBonusItem.expiresAt) {
        newActiveEffects.delete(newBonusItem.type);
        newBonusItem = null;
      }

      // Handle food collision
      if (newHead.x === prevState.food.x && newHead.y === prevState.food.y) {
        newFood = generateRandomFood(newSnake);
        newFoodEaten++;
        
        // Calculate score with potential double points
        const points = newActiveEffects.has('DOUBLE_POINTS') 
          ? SCORE_INCREMENT * 2 
          : SCORE_INCREMENT;
        newScore += points;

        // Increase speed
        newSpeed = Math.max(
          MIN_SPEED,
          Math.min(MAX_SPEED, INITIAL_SPEED - (newFoodEaten * SPEED_DECREASE_RATE))
        );

        // Spawn bonus item every BONUS_SPAWN_INTERVAL foods
        if (newFoodEaten % BONUS_SPAWN_INTERVAL === 0) {
          newBonusItem = generateBonusItem(newSnake, newFood);
        }
        if (!newActiveEffects.has('FREEZE')) { // Only grow if freeze is not active
          newSnake.push(newSnake[newSnake.length - 1]); // Grow the snake
        }
      } else {
        // Remove tail unless we're growing
        if (!newActiveEffects.has('SHRINK')) {
          newSnake.pop();
        }
      }

      // Handle bonus item collision
      if (newBonusItem && 
          newHead.x === newBonusItem.position.x && 
          newHead.y === newBonusItem.position.y) {
        newScore += BONUS_POINTS[newBonusItem.type];
        newActiveEffects.add(newBonusItem.type);
        
        if (newBonusItem.type === 'SPEED') {
          newSpeed = Math.max(MIN_SPEED, newSpeed - 20);
        }
        
        newBonusItem = null;
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        score: newScore,
        speed: newSpeed,
        foodEaten: newFoodEaten,
        bonusItem: newBonusItem,
        activeEffects: newActiveEffects
      };
    });
  }, [gameState.isPaused, gameState.isGameOver]);

  useInterval(moveSnake, gameState.speed);

  const handleDirectionChange = (newDirection: Direction) => {
    setGameState(prevState => {
      const opposites = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT'
      };
      
      if (opposites[newDirection] !== prevState.direction) {
        return { ...prevState, direction: newDirection };
      }
      return prevState;
    });
  };

  const togglePause = () => {
    setGameState(prevState => ({
      ...prevState,
      isPaused: !prevState.isPaused
    }));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const keyDirections: { [key: string]: Direction } = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT'
      };

      if (keyDirections[e.key]) {
        handleDirectionChange(keyDirections[e.key]);
      } else if (e.key === ' ') {
        togglePause();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (showModeSelect) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <h1 className="text-3xl font-bold text-white mb-8">Snake Game</h1>
        <GameModeSelect onSelect={handleGameMode} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="flex justify-between items-center w-full max-w-md mb-4">
        <div className="text-white text-2xl font-bold">Score: {gameState.score}</div>
        <div className="text-white">
          Speed: {Math.floor((INITIAL_SPEED - gameState.speed) / SPEED_DECREASE_RATE)}
        </div>
      </div>
      
      <div className="relative">
        <GameBoard 
          snake={gameState.snake} 
          food={gameState.food}
          bonusItem={gameState.bonusItem}
          gameMode={gameState.gameMode}
        />
        {gameState.isGameOver && (
          <GameOver 
            score={gameState.score} 
            onRestart={() => setShowModeSelect(true)} 
          />
        )}
      </div>

      <Controls
        onDirectionChange={handleDirectionChange}
        onPauseToggle={togglePause}
        isPaused={gameState.isPaused}
      />
    </div>
  );
}