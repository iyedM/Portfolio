'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const asciiArt = [
  '  _____              _ ',
  ' |_   _|            | |',
  '   | |  _   _  ___  __| |',
  '   | | | | | |/ _ \\/ _` |',
  '  _| |_| |_| |  __/ (_| |',
  ' |_____|\\__, |\\___|\\__,_|',
  '         __/ |           ',
  '        |___/            ',
]

interface ASCIIHeaderProps {
  onComplete?: () => void
}

export function ASCIIHeader({ onComplete }: ASCIIHeaderProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentLineIndex >= asciiArt.length) {
      setIsComplete(true)
      setTimeout(() => {
        onComplete?.()
      }, 300)
      return
    }

    const currentLine = asciiArt[currentLineIndex]
    
    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev]
          if (!newLines[currentLineIndex]) {
            newLines[currentLineIndex] = ''
          }
          newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1)
          return newLines
        })
        setCurrentCharIndex(prev => prev + 1)
      }, 10)

      return () => clearTimeout(timer)
    } else {
      // Move to next line
      setCurrentLineIndex(prev => prev + 1)
      setCurrentCharIndex(0)
    }
  }, [currentLineIndex, currentCharIndex, onComplete])

  if (isComplete) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="font-mono text-primary text-sm lg:text-base">
        <AnimatePresence>
          {displayedLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="whitespace-pre"
            >
              {line}
              {index === displayedLines.length - 1 && currentCharIndex < asciiArt[currentLineIndex]?.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-primary ml-1"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

