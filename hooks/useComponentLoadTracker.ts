"use client"

import { useEffect } from "react"
import { useLoader } from "@/context/LoaderContext"

export function useComponentLoadTracker(componentName: string, progressAmount = 3) {
  const { addProgressIncrement } = useLoader()

  useEffect(() => {
    // Mark component as loaded
    addProgressIncrement(progressAmount)
  }, [componentName, progressAmount, addProgressIncrement])
}
