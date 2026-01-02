"use client"

import { Header } from "@/components/layout/Header"
import { Hero } from "@/components/sections/Hero"
import { Reviews } from "@/components/sections/Reviews"
import { Footer } from "@/components/layout/Footer"
import { useFontLoadTracker } from "@/hooks/useFontLoadTracker"
import { useLoader } from "@/context/LoaderContext"
import styles from "./page.module.css"

export default function Home() {
  useFontLoadTracker()

  const { addProgressIncrement } = useLoader()

  return (
    <main className={styles.main}>
      <Header />
      <Hero />
      <Reviews />
      <Footer />
    </main>
  )
}
