"use client"

import Image from "next/image"
import { useComponentLoadTracker } from "@/hooks/useComponentLoadTracker"
import { useImageLoadTracker } from "@/hooks/useImageLoadTracker"
import styles from "./HeroHeadline.module.css"

export default function HeroHeadline() {
  useComponentLoadTracker("HeroHeadline", 3)
  useImageLoadTracker("/images/coffee-bean.svg")

  return (
    <div className={styles.headlineWrapper}>
      <h2 className={styles.headline}>
        {/* LINE 1 */}
        <span className={styles.line}>
          <span className={`${styles.phrase} ${styles.primary}`}>Claim Your</span>
          <span className={`${styles.phrase} ${styles.secondary}`}>Your Next</span>
        </span>

        {/* LINE 2 */}
        <span className={styles.line}>
          <span className={`${styles.phrase} ${styles.primary}`}>Own Cup of</span>
          <span className={`${styles.phrase} ${styles.secondary}`}>Favorite Cup</span>
        </span>

        {/* LINE 3 */}
        <span className={styles.line}>
          <span className={`${styles.phrase} ${styles.primary}`}>
            
            <span className={styles.coffeeInline}>
              Coffee
              <Image
                src="/images/coffee-bean.svg"
                alt="Coffee bean icon"
                width={80}
                height={80}
                className={styles.beanIcon}
                unoptimized
              />
            </span>
          </span>

          <span className={`${styles.phrase} ${styles.secondary}`}>Starts Here</span>
        </span>
      </h2>
    </div>
  )
}
