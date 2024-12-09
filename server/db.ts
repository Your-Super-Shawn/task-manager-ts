import clientPromise from "@/server/mongodb";
import { Db } from "mongodb";

export async function getDatabase(dbName: string): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}
