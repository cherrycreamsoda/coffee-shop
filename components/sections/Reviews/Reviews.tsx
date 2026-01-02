"use client"

import { useEffect } from "react"
import { useComponentLoadTracker } from "@/hooks/useComponentLoadTracker"
import { useLoader } from "@/context/LoaderContext"
import styles from "./Reviews.module.css"

interface Review {
  id: string
  author: string
  rating: number
  text: string
  avatar: string
}

interface ReviewsSectionProps {
  reviews?: Review[]
}

export default function Reviews({ reviews }: ReviewsSectionProps) {
  useComponentLoadTracker("Reviews", 3)

  const { addProgressIncrement } = useLoader()

  const defaultReviews: Review[] = [
    {
      id: "1",
      author: "Sarah Johnson",
      rating: 5,
      text: "Best coffee experience ever!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: "2",
      author: "Mike Chen",
      rating: 5,
      text: "Exceptional quality and taste.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    {
      id: "3",
      author: "Emma Davis",
      rating: 5,
      text: "Highly recommend to all coffee lovers!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
  ]

  const displayReviews = reviews || defaultReviews

  useEffect(() => {
    let loadedCount = 0
    const totalAvatars = displayReviews.length

    displayReviews.forEach((review) => {
      const img = new Image()
      img.onload = () => {
        loadedCount++
        if (loadedCount === totalAvatars) {
          addProgressIncrement(3)
        }
      }
      img.onerror = () => {
        loadedCount++
        if (loadedCount === totalAvatars) {
          addProgressIncrement(2)
        }
      }
      img.src = review.avatar
    })
  }, [displayReviews, addProgressIncrement])

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.heading}>Customer Reviews</h3>
        <div className={styles.grid}>
          {displayReviews.map((review) => (
            <div key={review.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <img src={review.avatar || "/placeholder.svg"} alt={review.author} className={styles.avatar} />
                <div>
                  <p className={styles.authorName}>{review.author}</p>
                  <div className={styles.starRating}>
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
