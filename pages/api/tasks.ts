import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "@/server/db";
import { ObjectId } from "mongodb";
import type { Task } from "@/types/task.data";

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

        // Ensure _id is converted to string for the client
        const formattedTasks: Task[] = tasks.map((task) => ({
          _id: task._id.toString(), // Convert ObjectId to string
          title: task.title,
          description: task.description || "",
          status: task.status as "To-do" | "In progress" | "Completed",
          dueDate: task.dueDate || "",
        }));

        res.status(200).json(formattedTasks);
        break;
      }
      case "POST": {
        // Create a new task
        const taskData = req.body as Omit<Task, "_id">; // Omit _id from the request body
        const result = await db.collection(collectionName).insertOne(taskData);
        res.status(201).json({
          message: "Task created",
          taskId: result.insertedId.toString(), // Convert ObjectId to string
        });
        break;
      }

      case "PUT": {
        // Update a task
        const { _id, ...updates } = req.body;

        if (!_id) {
          return res.status(400).json({ error: "_id is required for update" });
        }

        const result = await db
          .collection(collectionName)
          .updateOne({ _id: new ObjectId(_id) }, { $set: updates });
        res.status(200).json({ message: "Task updated", result });
        break;
      }
      case "DELETE": {
        // Delete a task
        const { _id } = req.body;

        if (!_id) {
          return res.status(400).json({ error: "_id is required for delete" });
        }

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
