"use client"

import { useEffect, useState } from "react"
import { useLoader } from "@/context/LoaderContext"
import styles from "./Loader.module.css"

export default function Loader() {
  const { progress, isVisible, setIsVisible, fontsReady } = useLoader()
  const [hasCompleted, setHasCompleted] = useState(false)
  const [showCounter, setShowCounter] = useState(false)

  useEffect(() => {
    // Check for the specific font used in the loader
    document.fonts.load('1em "Geist"').then(() => {
      setShowCounter(true)
      console.log("Priority loader font ready")
    })
  }, [])

  useEffect(() => {
    // No longer needed to force visibility on body as it's visible by default now
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {}, 50)
    return () => clearTimeout(timer)
  }, [progress])

  // Trigger exit animation when progress reaches 100
  useEffect(() => {
    if (progress >= 100 && !hasCompleted) {
      setHasCompleted(true)

      const revealTimer = setTimeout(() => {
        const wrapper = document.getElementById("main-content-wrapper")
        if (wrapper) wrapper.classList.add("is-ready")
      }, 400)

      // Hide loader after animation completes
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 800)

      return () => {
        clearTimeout(timer)
        clearTimeout(revealTimer)
      }
    }
  }, [progress, hasCompleted, setIsVisible])

  if (!isVisible) return null

  return (
    <div className={`${styles.loaderContainer} ${hasCompleted ? styles.exit : ""}`}>
      {/* Layer 1: Main Background */}
      <div className={styles.backgroundLayer}></div>

      {/* Layer 2: Loading Amount with Liquid Waves */}
      <div className={styles.loadingLayer} style={{ height: `${progress}%` }} />

      {/* Layer 3: Percentage Counter */}
      <div
        className={`${styles.counterContainer} ${hasCompleted ? styles.counterExit : ""} ${showCounter ? styles.show : styles.hide}`}
        style={{ opacity: showCounter ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
      >
        <div className={styles.percentageText}>{Math.floor(progress)}%</div>
      </div>
    </div>
  )
}
