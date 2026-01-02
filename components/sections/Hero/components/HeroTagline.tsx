"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useComponentLoadTracker } from "@/hooks/useComponentLoadTracker"
import styles from "./HeroTagline.module.css"

export default function HeroTagline() {
  useComponentLoadTracker("HeroTagline", 2)

  return (
    <div className={styles.sidebar}>
      {/* Tagline Text */}
      <p className={styles.tagline}>
        Elevate your coffee experience with our handpicked offerings, designed to satisfy every coffee lover's
        tastebuds.
      </p>

      {/* Learn More Link */}
      <Link href="/about" className={styles.learnMoreLink}>
        <span className={styles.linkText}>
          Learn More <ArrowRight size={16} />
        </span>
        <span className={styles.linkTextClone}>
          Learn More <ArrowRight size={16} />
        </span>
      </Link>
    </div>
  )
}
