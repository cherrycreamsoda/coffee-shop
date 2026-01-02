"use client"

import Image from "next/image"
import styles from "./MenuCategories.module.css"

interface Category {
  id: string
  name: string
  image: string
}

interface MenuCategoriesProps {
  categories: Category[]
  selectedId: string
  onSelectCategory: (id: string) => void
}

export function MenuCategories({ categories, selectedId, onSelectCategory }: MenuCategoriesProps) {
  return (
    <div className={styles.categoriesContainer}>
      <h2 className={styles.categoriesTitle}>Categories</h2>
      <div className={styles.categoriesList}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${selectedId === category.id ? styles.active : ""}`}
            onClick={() => onSelectCategory(category.id)}
          >
            <span className={styles.categoryName}>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
