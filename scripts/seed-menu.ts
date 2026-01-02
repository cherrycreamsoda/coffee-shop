import { MongoClient } from "mongodb"
import fs from "fs"
import path from "path"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
}

async function seedDatabase() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("coffeeapp")
    const menuCollection = db.collection("menu_items")
    const categoriesCollection = db.collection("categories")

    // Read the menu file
    // Note: The file path might need adjustment based on where the attachment is saved
    const filePath = path.join(process.cwd(), "./scripts/menu.txt")

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`)
      return
    }

    const content = fs.readFileSync(filePath, "utf-8")
    const lines = content.split("\n")

    const items: any[] = []
    let currentItem: any = {}

    for (const line of lines) {
      const trimmedLine = line.trim()
      if (!trimmedLine) continue

      if (trimmedLine.startsWith("Category:")) {
        // If we were building an item and hit a new category, push the previous one if it has a title
        if (currentItem.title) {
          items.push({ ...currentItem })
          currentItem = {}
        }
        currentItem.category = trimmedLine.replace("Category:", "").trim()
      } else if (trimmedLine.startsWith("Title:")) {
        currentItem.title = trimmedLine.replace("Title:", "").trim()
      } else if (trimmedLine.startsWith("Description:")) {
        currentItem.description = trimmedLine.replace("Description:", "").trim()
      } else if (trimmedLine.startsWith("Price:")) {
        const priceStr = trimmedLine.replace("Price:", "").trim().replace("from ", "")
        currentItem.price = Number.parseFloat(priceStr) || 0
      }
    }

    // Push the last item
    if (currentItem.title) {
      items.push(currentItem)
    }

    console.log(`Parsed ${items.length} items from text file`)

    // Clear existing data
    await menuCollection.deleteMany({})
    await categoriesCollection.deleteMany({})

    // Insert items
    if (items.length > 0) {
      await menuCollection.insertMany(items)
      console.log("Menu items seeded successfully")

      // Extract unique categories and seed them
      const categoryNames = Array.from(new Set(items.map((item) => item.category)))
      const categories = categoryNames.map((name, index) => ({
        name,
        slug: slugify(name),
        order: index,
        image: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(name)}`,
      }))

      await categoriesCollection.insertMany(categories)
      console.log("Categories seeded successfully")
    }
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
    console.log("Connection closed")
  }
}

seedDatabase()
