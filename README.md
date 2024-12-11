# ✍️ Task Manager | Playground

A lightweight app built using Next.js, TypeScript and MongoDB, designed primarily for managing tasks and performing CRUD operations.

## Overview

This project serves as a simple, user-friendly interface for the task manager application. It allows users to:

- Create, Update, Read and Delete (CRUD) operations for task entries
- Storing and removing task from the database
- Status-based filtering of tasks (To-do, In Progress, Completed)

The app is built using Next.js, a React framework that enables server-side rendering and static site generation. It uses TypeScript for static types, MongoDB for data storage, and Material-UI for styling components. The front-end server (next.js) is connected to the MongoDB server using the `mongoose` library.

## Technologies

| Technology | Purpose                                                      | Version |
| ---------- | ------------------------------------------------------------ | ------- |
| Next.js    | Creating the web application with server-rendered components | 15.0,.4 |
| TypeScript | Static types to improve code quality and maintainability     | 5       |
| MUI        | React component library for building user interfaces         | 6.1.10  |
| mongodb    | NoSQL database used for storing data                         | 6.11.0  |
| dayjs      | Library for date and time manipulation                       | 1.11.13 |
| lodash     | Utility library for simplifying JavaScript operations        | 4.17.21 |
| Jest       | Testing framework for unit and integration tests             | 27.4.7  |

## Getting Started

Note -> Don't forget to configure `.env.local` file in your local environemnt for `MONGO_DB_URL`, otherwise it will fail to connect to the databse.

1. Clone the repository:

   ```sh
   git clone https://github.com/Your-Super-Shawn/task-manager-ts.git

   cd task-manager-ts
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. (Optional) Run the test cases in local terminal

   ```sh
   npx jest
   ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000)

## Project Structure

- `components`: Contains React components used in the application
- `data`: Contains the data model for the application
- `hooks`: Contains custom React hooks
- `pages`: Contains the Next.js pages for the application
- `public`: Contains static assets for the application
- `server`: Contains configuration for the connection of MongoDB server
- `styles`: Contains global styles for the application
- `theme`: Contains MUI theme configuration
- `types`: Contains TypeScript types and interfaces

### Enjoy testing! 🚀
