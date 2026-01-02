"use client"

import styles from "./Hero.module.css"
import HeroTagline from "./components/HeroTagline"
import HeroImage from "./components/HeroImage"
import HeroHeadline from "./components/HeroHeadline"
import HeroCTAButton from "./components/HeroCTAButton"
import FoodMenuButton from "./components/FoodMenuButton"
import HeroReviews from "./components/HeroReviews"

export default function Hero() {
  return (
    <main className={styles.frontPage}>
      {/* FIRST COLUMN: Tagline Section */}
      <section className={`${styles.mainSection} ${styles.firstMainSection}`}>
        {/* Top: HeroTagline */}
        <div className={styles.firstMainSectionTop}>
          <HeroTagline />
        </div>

        {/* Bottom: Clean section */}
        <div className={styles.firstMainSectionBottom}></div>
      </section>

      {/* SECOND COLUMN: Image Container */}
      <section className={`${styles.mainSection} ${styles.secondMainSection}`}>
        <HeroImage />
      </section>

      {/* THIRD COLUMN: Headline + CTA + Reviews */}
      <section className={`${styles.mainSection} ${styles.thirdMainSection}`}>
        {/* Top: HeroHeadline */}
        <div className={styles.thirdMainSectionTop}>
          <HeroHeadline />
        </div>

        {/* Bottom: CTA Button + Reviews */}
        <div className={styles.thirdMainSectionBottom}>
          <div className={styles.ctaContainer}>
            <FoodMenuButton />
            <HeroCTAButton />
          </div>
          <div className={styles.reviewsContainer}>
            <HeroReviews />
          </div>
        </div>
      </section>
    </main>
  )
}
