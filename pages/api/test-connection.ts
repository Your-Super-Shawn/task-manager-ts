import type { NextApiRequest, NextApiResponse } from "next";
import { testMongoConnection } from "@/lib/testConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await testMongoConnection();
    res.status(200).json({ message: "Successfully connected to MongoDB!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to MongoDB" });
  }
}
