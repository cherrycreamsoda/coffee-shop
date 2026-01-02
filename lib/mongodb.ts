import { MongoClient, ServerApiVersion } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the MongoClient across module reloads
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, create a new MongoClient
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

// Helper function to get database
export async function getDatabase(dbName: string = 'coffeeapp') {
  const client = await clientPromise
  return client.db(dbName)
}

// Helper function to get collection
export async function getCollection(collectionName: string, dbName: string = 'coffeeapp') {
  const db = await getDatabase(dbName)
  return db.collection(collectionName)
}
