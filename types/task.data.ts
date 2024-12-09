export type Task = {
  _id: string;
  title: string;
  description?: string;
  status: "To-do" | "In progress" | "Completed";
  dueDate?: string;
};
