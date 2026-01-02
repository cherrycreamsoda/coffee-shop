"use client"

import { useEffect } from "react"
import { useLoader } from "@/context/LoaderContext"

export function useFontLoadTracker() {
  const { addProgressIncrement, updateProgress, setFontsReady } = useLoader()

  useEffect(() => {
    let fontLoadingStarted = false

    const startFontTracking = () => {
      if (fontLoadingStarted) return
      fontLoadingStarted = true

      if ("fonts" in document) {
        document.fonts.ready
          .then(() => {
            addProgressIncrement(15)
            setFontsReady(true)
          })
          .catch(() => {
            setFontsReady(true)
          })
      } else {
        setFontsReady(true)
      }

      // Add progress increment after DOM content is loaded
      const handleDOMContentLoaded = () => {
        addProgressIncrement(8)
      }

      const handleWindowLoad = () => {
        updateProgress(100)
      }

      window.addEventListener("DOMContentLoaded", handleDOMContentLoaded)
      window.addEventListener("load", handleWindowLoad, true)

      return () => {
        window.removeEventListener("DOMContentLoaded", handleDOMContentLoaded)
        window.removeEventListener("load", handleWindowLoad, true)
      }
    }

    // Start tracking when document is interactive
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startFontTracking)
      return () => {
        document.removeEventListener("DOMContentLoaded", startFontTracking)
      }
    } else {
      startFontTracking()
    }
  }, [addProgressIncrement, updateProgress, setFontsReady])
}
