"use client"

import { Menu } from "lucide-react"
import { useComponentLoadTracker } from "@/hooks/useComponentLoadTracker"
import styles from "./Header.module.css"

export default function Header() {
  useComponentLoadTracker("Header", 2)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Coffee.</h1>
        <button className={styles.menuButton} aria-label="Open menu">
          <Menu size={24} />
        </button>
      </div>
    </header>
  )
}
