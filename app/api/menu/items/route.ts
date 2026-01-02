import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const collection = await getCollection("menu_items")

    let query = {}
    if (category) {
      query = { category }
    }

    const items = await collection.find(query).toArray()

    return NextResponse.json({
      success: true,
      data: items,
    })
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch menu items",
      },
      { status: 500 }
    )
  }
}
