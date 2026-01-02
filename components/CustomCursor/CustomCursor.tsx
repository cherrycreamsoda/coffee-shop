"use client"

import { useEffect, useState, useRef } from "react"
import styles from "./CustomCursor.module.css"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      setTimeout(() => {
        setRingPosition({ x: e.clientX, y: e.clientY })
      }, 50)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target
      if (!target || !(target instanceof HTMLElement)) return

      // Check if target is a link or button
      if (target.tagName === "A" || target.tagName === "BUTTON") {
        setIsHovering(true)
      } else if (target.closest("a") || target.closest("button")) {
        // Check if target is inside a link or button
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target
      if (!target || !(target instanceof HTMLElement)) return

      // Check if target is a link or button
      if (target.tagName === "A" || target.tagName === "BUTTON") {
        setIsHovering(false)
      } else if (target.closest("a") || target.closest("button")) {
        // Check if target is inside a link or button
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver, true)
    document.addEventListener("mouseout", handleMouseOut, true)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver, true)
      document.removeEventListener("mouseout", handleMouseOut, true)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className={`${styles.dot} ${isHovering ? styles.dotHover : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      <div
        ref={ringRef}
        className={styles.ring}
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
        }}
      />
    </>
  )
}
