"use client"

import { useState } from "react"
import Link from "next/link"
import styles from "./FoodMenuButton.module.css"

export default function FoodMenuButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className={styles.buttonContainer}>
      <Link href="/menu">
        <button
          className={styles.foodMenuButton}
          aria-label="Food Menu"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg
            id="food-menu"
            width="70"
            height="70"
            viewBox="-25 -25 50 50"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M-11-9 11-9 11 11-11 11ZM0-7 0-6C-4-6-6-4-6 0L6 0C6-4 4-6 0-6ZM-6 3 6 3ZM-4 8 4 8ZM-11-9 6-13 6-9Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </Link>

      {isHovered && (
        <div className={styles.tooltip}>
          Show Food Menu
        </div>
      )}
    </div>
  )
}
