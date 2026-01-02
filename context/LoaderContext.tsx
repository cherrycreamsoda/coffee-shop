"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback, useEffect } from "react"

interface LoaderContextType {
  progress: number
  isLoading: boolean
  isVisible: boolean
  fontsReady: boolean
  priorityFontsReady: boolean
  updateProgress: (value: number) => void
  setIsLoading: (value: boolean) => void
  setIsVisible: (value: boolean) => void
  addProgressIncrement: (amount: number) => void
  setFontsReady: (value: boolean) => void
  setPriorityFontsReady: (value: boolean) => void
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined)

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [targetProgress, setTargetProgress] = useState(0)
  const [displayProgress, setDisplayProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true) // Default to true to ensure it's rendered immediately
  const [fontsReady, setFontsReady] = useState(false) // Track when fonts are loaded
  const [priorityFontsReady, setPriorityFontsReady] = useState(false)

  useEffect(() => {
    if (displayProgress >= 100) return

    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }

        // If we haven't reached the target, move towards it smoothly
        // If the page is "loaded" (target=100), we still move fluidly
        const step = targetProgress > prev ? 1.5 : 0.7
        const next = prev + step

        return next >= 100 ? 100 : next
      })
    }, 20) // 50fps fluid movement

    return () => clearInterval(interval)
  }, [targetProgress, displayProgress])

  const updateProgress = useCallback((value: number) => {
    setTargetProgress((prev) => Math.min(Math.max(value, prev), 100))
  }, [])

  const addProgressIncrement = useCallback((amount: number) => {
    setTargetProgress((prev) => Math.min(prev + amount, 100))
  }, [])

  useEffect(() => {
    if (fontsReady) {
      console.log("Fonts reported ready in context")
      setIsVisible(true)
    }
  }, [fontsReady])

  useEffect(() => {
    if (!isLoading || targetProgress >= 95) return

    const timer = setTimeout(() => {
      console.log("Simulating background progress...")
      addProgressIncrement(Math.random() * 15)
    }, 2000)

    return () => clearTimeout(timer)
  }, [targetProgress, isLoading, addProgressIncrement])

  useEffect(() => {
    if (!isLoading) return

    const fallbackTimer = setTimeout(() => {
      updateProgress(100)
    }, 8000)

    return () => clearTimeout(fallbackTimer)
  }, [isLoading, updateProgress])

  return (
    <LoaderContext.Provider
      value={{
        progress: displayProgress,
        isLoading,
        isVisible,
        fontsReady,
        priorityFontsReady,
        updateProgress,
        setIsLoading,
        setIsVisible,
        addProgressIncrement,
        setFontsReady,
        setPriorityFontsReady,
      }}
    >
      {children}
    </LoaderContext.Provider>
  )
}

export function useLoader() {
  const context = useContext(LoaderContext)
  if (!context) {
    throw new Error("useLoader must be used within LoaderProvider")
  }
  return context
}
