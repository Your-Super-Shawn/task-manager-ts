import { MongoClient } from "mongodb";

if (!process.env.MONGO_DB_URL) {
  throw new Error(
    "Please define the MONGO_DB_URL environment variable in .env.local"
  );
}

const uri = process.env.MONGO_DB_URL;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Check if the client connection is already created
if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // for production use, use a global variable so the value is persisted
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
