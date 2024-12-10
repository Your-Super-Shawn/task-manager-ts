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
        const taskData = req.body as Partial<Omit<Task, "_id">>;
        const errors = validateTask(taskData);

        if (errors.length > 0) {
          return res.status(400).json({ errors });
        }

        const result = await db.collection(collectionName).insertOne(taskData);
        res.status(201).json({
          message: "Task created",
          taskId: result.insertedId.toString(),
        });
        break;
      }

      case "PUT": {
        // Update a task
        const { _id, ...updates } = req.body;
        if (!_id) {
          return res.status(400).json({ error: "_id is required for update." });
        }

        const errors = validateTask(updates);

        if (errors.length > 0) {
          return res.status(400).json({ errors });
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
          return res.status(400).json({ error: "_id is required for delete." });
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

const validateTask = (task: Partial<Task>) => {
  const errors: string[] = [];

  if (
    !task.title ||
    typeof task.title !== "string" ||
    task.title.trim().length === 0
  ) {
    errors.push("Title is required and must be a non-empty string.");
  }

  if (task.description && typeof task.description !== "string") {
    errors.push("Description must be a string.");
  }

  if (
    task.status &&
    !["To-do", "In progress", "Completed"].includes(task.status)
  ) {
    errors.push(
      "Status must be one of 'To-do', 'In progress', or 'Completed'."
    );
  }

  if (task.dueDate && isNaN(Date.parse(task.dueDate))) {
    errors.push("Due date must be a valid date string.");
  }

  return errors;
};
