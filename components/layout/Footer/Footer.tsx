"use client"

import { useComponentLoadTracker } from "@/hooks/useComponentLoadTracker"
import styles from "./Footer.module.css"

export default function Footer() {
  useComponentLoadTracker("Footer", 2)

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>© 2025 Coffee. All rights reserved.</p>
      </div>
    </footer>
  )
}
