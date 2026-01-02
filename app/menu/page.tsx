"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MenuCategories } from "@/components/Menu/MenuCategories"
import { MenuItems } from "@/components/Menu/MenuItems"
import styles from "./menu.module.css"
import { LucideArrowLeft } from "lucide-react"

export default function MenuPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/menu/categories")
        const json = await response.json()
        if (json.success) {
          setCategories(json.data)
          if (json.data.length > 0) {
            setSelectedCategory(json.data[0].name)
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategories()
  }, [])

  // Fetch items when selectedCategory changes
  useEffect(() => {
    if (!selectedCategory) return

    async function fetchItems() {
      try {
        const response = await fetch(`/api/menu/items?category=${encodeURIComponent(selectedCategory)}`)
        const json = await response.json()
        if (json.success) {
          setItems(json.data)
        }
      } catch (error) {
        console.error("Error fetching items:", error)
      }
    }
    fetchItems()
  }, [selectedCategory])

  // Map API data to component props structure
  const formattedCategories = categories.map((cat) => ({
    id: cat.name, // Using name as ID for category selection logic
    name: cat.name,
    image: cat.image || "/steaming-coffee-cup.png",
  }))

  const formattedItems = items.map((item) => ({
    id: item._id,
    name: item.title,
    description: item.description || "",
    price: item.price, // Note: MenuItems component currently doesn't show price, but we pass it anyway
  }))

  return (
    <main className={styles.menuPage}>
      <div className={styles.menuContainer}>
        <div className={styles.header}>
          <Link href="/">
            <button className={styles.backButton}><LucideArrowLeft />Back</button>
          </Link>
          <h1 className={styles.title}>Food Menu</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading menu...</p>
          </div>
        ) : (
          <div className={styles.menuGrid}>
            <MenuCategories
              categories={formattedCategories}
              selectedId={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <MenuItems items={formattedItems} />
          </div>
        )}
      </div>
    </main>
  )
}
