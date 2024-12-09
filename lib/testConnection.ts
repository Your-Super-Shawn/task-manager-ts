import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_DB_URL;
if (!uri) {
  throw new Error(
    "Please define the MONGO_DB_URL environment variable in .env.local :)"
  );
}

// Test the connection to the MongoDB cluster
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function testMongoConnection() {
  try {
    // Connect to the MongoDB cluster
    console.log("Connecting to the MongoDB cluster...");
    await client.connect();

    // Send a ping command to the server
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!!"
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  } finally {
    // Close the connection
    await client.close();
  }
}
