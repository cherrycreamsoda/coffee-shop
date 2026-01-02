import Link from "next/link"
import { LucideArrowLeft } from "lucide-react"
import styles from "./about.module.css"

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      <div className={styles.aboutContainer}>
        <div className={styles.header}>
          <Link href="/">
            <button className={styles.backButton}>
              <LucideArrowLeft />
              Back
            </button>
          </Link>
          <h1 className={styles.title}>About Us</h1>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Our Story</h2>
              <p className={styles.text}>
                Founded with a passion for the perfect roast, our journey began in a small corner of the city. We
                believe that coffee is more than just a drink—it's an experience that brings people together and fuels
                creativity.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.text}>
                To source the finest beans from sustainable farms around the globe and roast them with precision to
                unlock their unique flavor profiles. We are dedicated to providing our community with an elevated coffee
                experience in every cup.
              </p>
            </section>
          </div>

          <div className={styles.sidebarContent}>
            <div className={styles.statsCard}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Years of Roasting</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>25+</span>
                <span className={styles.statLabel}>Direct Trade Farms</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100k+</span>
                <span className={styles.statLabel}>Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
