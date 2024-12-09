import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Button, ThemeProvider, createTheme } from "@mui/material";
import { Task } from "@/types/task.data";

interface TaskDataTableProps {
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

const TaskDataTable: React.FC<TaskDataTableProps> = ({
  tasks,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Define columns for the table
  const columns: MRT_ColumnDef<Task>[] = isMobile
    ? [
        { accessorKey: "title", header: "Title" },
        { accessorKey: "status", header: "Status" },
      ]
    : [
        { accessorKey: "title", header: "Title" },
        { accessorKey: "description", header: "Description" },
        { accessorKey: "status", header: "Status" },
        { accessorKey: "dueDate", header: "Due Date" },
      ];

  // Custom dark theme
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9",
      },
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <MaterialReactTable
        columns={columns}
        data={tasks}
        enableColumnResizing
        enableSorting
        enableGlobalFilter
        enablePagination
        enableRowSelection={false}
        muiTableContainerProps={{
          sx: {
            overflowX: "auto", // 启用横向滚动
            maxWidth: "100%", // 确保表格不会超出屏幕宽度
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            fontWeight: "bold",
            backgroundColor: darkTheme.palette.background.paper,
            color: darkTheme.palette.text.primary,
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            backgroundColor: darkTheme.palette.background.default,
            color: darkTheme.palette.text.primary,
          },
        }}
      />
    </ThemeProvider>
  );
};

export default TaskDataTable;
