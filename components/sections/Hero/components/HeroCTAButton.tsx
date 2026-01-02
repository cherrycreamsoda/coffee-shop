"use client"

import { ArrowRight } from "lucide-react"
import { useComponentLoadTracker } from "@/hooks/useComponentLoadTracker"
import styles from "./HeroCTAButton.module.css"

export default function HeroCTAButton() {
  useComponentLoadTracker("HeroCTAButton", 2)

  return (
    <button className={styles.ctaButton}>
      <span className={styles.text}>
        Buy Now <ArrowRight size={18} />
      </span>
      <span className={styles.textClone}>
        Buy Now <ArrowRight size={18} />
      </span>
    </button>
  )
}
