import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

type Task = {
  _id?: ObjectId | string; // Not sure if it's ObjectId or string
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbName = "task-manager-db";
  const collectionName = "tasks";

  try {
    const db = await getDatabase(dbName);

    switch (req.method) {
      case "GET": {
        // Get all tasks
        const tasks = await db.collection(collectionName).find({}).toArray();

        // Convert _id to string for returning to the client
        res.status(200).json(
          tasks.map((task) => ({
            ...task,
            _id: task._id?.toString(),
          }))
        );
        break;
      }
      case "POST": {
        // Create a new task
        const { _id, ...taskData }: Task = req.body;
        const result = await db.collection(collectionName).insertOne(taskData);
        res
          .status(201)
          .json({ message: "Task created", taskId: result.insertedId });
        break;
      }
      case "PUT": {
        // Update task
        const { _id, ...updates } = req.body;

        if (!_id) {
          return res.status(400).json({ error: "_id is required for update" });
        }

        // Convert _id to ObjectId
        const result = await db
          .collection(collectionName)
          .updateOne({ _id: new ObjectId(_id) }, { $set: updates });
        res.status(200).json({ message: "Task updated", result });
        break;
      }
      case "DELETE": {
        // Delete task
        const { _id } = req.body;

        if (!_id) {
          return res.status(400).json({ error: "_id is required for delete" });
        }

        // Convert _id to ObjectId
        const result = await db
          .collection(collectionName)
          .deleteOne({ _id: new ObjectId(_id) });
        res.status(200).json({ message: "Task deleted", result });
        break;
      }
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
