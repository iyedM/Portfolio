'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

const GRID_SIZE = 15
const CELL_SIZE = 12

const goodCommands = ['docker', 'kubectl', 'terraform', 'git', 'npm']
const badCommands = ['rm -rf', 'format c:', 'del /f', 'sudo rm']

interface Position {
  x: number
  y: number
}

export function TerminalSnakeInline() {
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }])
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 })
  const [food, setFood] = useState<Position>({ x: 10, y: 10 })
  const [foodType, setFoodType] = useState<'good' | 'bad'>('good')
  const [gameOver, setGameOver] = useState(false)
  const [foodText, setFoodText] = useState('')
  const gameLoopRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('snake-highscore')
      if (stored) {
        setHighScore(parseInt(stored))
      }
    }
  }, [])

  const generateFood = useCallback(() => {
    const newFood: Position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }
    const isGood = Math.random() > 0.3 // 70% good commands
    setFood(newFood)
    setFoodType(isGood ? 'good' : 'bad')
  }, [])

  const startGame = () => {
    setSnake([{ x: 7, y: 7 }])
    setDirection({ x: 1, y: 0 })
    setScore(0)
    setGameOver(false)
    setIsPlaying(true)
    setIsPaused(false)
    generateFood()
  }

  const endGame = () => {
    setIsPlaying(false)
    setGameOver(true)
    if (score > highScore) {
      setHighScore(score)
      if (typeof window !== 'undefined') {
        localStorage.setItem('snake-highscore', score.toString())
      }
    }
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current)
    }
  }

  useEffect(() => {
    if (!isPlaying || isPaused || gameOver) return

    const moveSnake = () => {
      setSnake(prev => {
        const head = prev[0]
        const newHead: Position = {
          x: head.x + direction.x,
          y: head.y + direction.y
        }

        // Check wall collision
        if (
          newHead.x < 0 || newHead.x >= GRID_SIZE ||
          newHead.y < 0 || newHead.y >= GRID_SIZE
        ) {
          endGame()
          return prev
        }

        // Check self collision
        if (prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          endGame()
          return prev
        }

        const newSnake = [newHead, ...prev]

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          if (foodType === 'good') {
            setScore(s => s + 10)
            generateFood()
          } else {
            endGame()
            return prev
          }
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }

    gameLoopRef.current = setInterval(moveSnake, 150)
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [isPlaying, isPaused, gameOver, direction, food, foodType, generateFood])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying || isPaused) return

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 })
          break
        case ' ':
          e.preventDefault()
          setIsPaused(p => !p)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, isPaused, direction])

  useEffect(() => {
    if (mounted && (food.x !== 0 || food.y !== 0)) {
      if (foodType === 'good') {
        setFoodText(goodCommands[Math.floor(Math.random() * goodCommands.length)])
      } else {
        setFoodText(badCommands[Math.floor(Math.random() * badCommands.length)])
      }
    }
  }, [mounted, food, foodType])

  return (
    <div className="space-y-4">
      {/* Game Info */}
      <div className="flex items-center justify-between font-mono text-sm">
        <div>
          <span className="text-text-tertiary">Score: </span>
          <span className="text-primary font-bold">{score}</span>
        </div>
        <div>
          <span className="text-text-tertiary">High: </span>
          <span className="text-amber-400 font-bold">{highScore}</span>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative bg-[#0d1117] border border-border rounded-lg p-4">
        <div
          className="relative mx-auto"
          style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
        >
          {/* Grid */}
          <div className="absolute inset-0 grid-bg opacity-20" />

          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={cn(
                'absolute rounded transition-all',
                index === 0 ? 'bg-primary' : 'bg-primary/60'
              )}
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE - 1,
                height: CELL_SIZE - 1,
              }}
            />
          ))}

          {/* Food */}
          {mounted && foodText && (
            <div
              className={cn(
                'absolute rounded flex items-center justify-center text-[6px] font-mono transition-all',
                foodType === 'good' ? 'bg-emerald-500' : 'bg-accent-error'
              )}
              style={{
                left: food.x * CELL_SIZE,
                top: food.y * CELL_SIZE,
                width: CELL_SIZE - 1,
                height: CELL_SIZE - 1,
              }}
            >
              <span className="text-white">{foodText}</span>
            </div>
          )}
        </div>

        {/* Pause Overlay */}
        {isPaused && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
            <span className="font-mono text-lg text-primary">PAUSED</span>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 rounded-lg">
            <span className="font-mono text-lg text-accent-error mb-2">GAME OVER</span>
            <span className="font-mono text-sm text-text-secondary">Final Score: {score}</span>
          </div>
        )}

        {/* Start Screen */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 rounded-lg">
            <p className="font-mono text-xs text-text-secondary mb-2 text-center px-4">
              Eat good commands (green), avoid bad ones (red)
            </p>
            <p className="font-mono text-[10px] text-text-tertiary mb-3 text-center px-4">
              Use arrow keys, Space to pause
            </p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-background font-mono text-xs hover:shadow-lg transition-all"
            >
              <Play className="w-3 h-3" />
              Start Game
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      {isPlaying && !gameOver && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setIsPaused(p => !p)}
            className="px-3 py-1 rounded border border-border hover:border-primary font-mono text-xs transition-colors"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={endGame}
            className="px-3 py-1 rounded border border-border hover:border-accent-error hover:text-accent-error font-mono text-xs transition-colors"
          >
            End Game
          </button>
        </div>
      )}

      {gameOver && (
        <button
          onClick={startGame}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-background font-mono text-sm hover:shadow-lg transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Play Again
        </button>
      )}
    </div>
  )
}

