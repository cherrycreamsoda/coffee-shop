"use client"

import { useComponentLoadTracker } from "@/hooks/useComponentLoadTracker"
import styles from "./HeroReviews.module.css"

export default function HeroReviews() {
  useComponentLoadTracker("HeroReviews", 2)

  return (
    <div className={styles.reviewsGrid}>
      <div className={styles.reviewsSection}>
        <div className={styles.avatarStack}>
          <div className={styles.avatar1}></div>
          <div className={styles.avatar2}></div>
          <div className={styles.avatar3}></div>
          <div className={styles.avatar4}></div>
        </div>
        <div>
          <p className={styles.reviewCount}>37k well reviews</p>
          <div className={styles.starRating}>
            {[...Array(5)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
