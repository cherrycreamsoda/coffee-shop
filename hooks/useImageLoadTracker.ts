"use client"

import { useEffect } from "react"
import { useLoader } from "@/context/LoaderContext"

export function useImageLoadTracker(src: string | undefined, onLoad?: () => void) {
  const { addProgressIncrement } = useLoader()

  useEffect(() => {
    if (!src) {
      onLoad?.()
      return
    }

    const img = new Image()
    img.crossOrigin = "anonymous"

    const handleLoad = () => {
      addProgressIncrement(5)
      onLoad?.()
    }

    const handleError = () => {
      addProgressIncrement(3)
      onLoad?.()
    }

    img.addEventListener("load", handleLoad)
    img.addEventListener("error", handleError)
    img.src = src

    return () => {
      img.removeEventListener("load", handleLoad)
      img.removeEventListener("error", handleError)
    }
  }, [src, addProgressIncrement, onLoad])
}
