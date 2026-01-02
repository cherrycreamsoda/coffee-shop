"use client"

import styles from "./MenuItems.module.css"

interface MenuItem {
  id: string // changed from number to string for MongoDB _id
  name: string
  description: string
  price?: number // added optional price prop
}

interface MenuItemsProps {
  items: MenuItem[]
}

export function MenuItems({ items }: MenuItemsProps) {
  return (
    <div className={styles.itemsContainer}>
      <h2 className={styles.itemsTitle}>Menu Items</h2>
      <div className={styles.itemsList}>
        {items.map((item, index) => (
          <div key={item.id} className={styles.menuItem}>
            <div className={styles.itemContent}>
              <div className={styles.itemHeader}>
                <h3 className={styles.itemName}>{item.name}</h3>
                {item.price && <span className={styles.itemPrice}>£{item.price.toFixed(2)}</span>}
              </div>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
            {index < items.length - 1 && <div className={styles.separator} />}
          </div>
        ))}
      </div>
    </div>
  )
}
