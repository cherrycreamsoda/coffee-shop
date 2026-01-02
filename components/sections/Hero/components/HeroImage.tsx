"use client"

import Image from "next/image"
import { useComponentLoadTracker } from "@/hooks/useComponentLoadTracker"
import { useImageLoadTracker } from "@/hooks/useImageLoadTracker"
import styles from "./HeroImage.module.css"

export default function HeroImage() {
  useComponentLoadTracker("HeroImage", 4)
  useImageLoadTracker("/images/paper-coffee-cup.png")

  return (
    <div className={styles.imageContainer}>
      {/* BACK FILLED TEXT (will be hidden by SVG) */}
      <p className={`${styles.heroText} ${styles.fillText}`}>Âme & arôme</p> <br />
      <p className={styles.heroTextSmall}>
        in <span className={styles.highlight}>Your</span> thermal tumbler, to start your day.
      </p>
      {/* SVG IMAGE IN MIDDLE */}
      <Image
        src="/images/paper-coffee-cup.png"
        alt="Paper Coffee Cup"
        fill
        className={styles.heroImage}
        priority
        unoptimized
      />
      {/* TOP STROKE TEXT */}
      <p className={`${styles.heroText} ${styles.strokeText}`}>Âme & arôme</p>
    </div>
  )
}
