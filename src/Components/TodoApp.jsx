import React, { useState } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem as MuiMenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Delete, Edit, Add, Search } from "@mui/icons-material";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    category: "",
    status: "",
    Date: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (taskDetails.title.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), ...taskDetails, completed: false },
      ]);
      toast("Add New Todo", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      resetDialog();
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setTaskDetails(taskToEdit);
    setEditId(id);
    setDialogOpen(true);
  };

  const handleSaveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editId ? { ...task, ...taskDetails } : task
      )
    );
    resetDialog();
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const resetDialog = () => {
    setDialogOpen(false);
    setEditId(null);
    setTaskDetails({
      title: "",
      description: "",
      category: "",
      status: "",
      Date: "",
    });
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        📝 To-Do List
      </Typography>
      <ToastContainer />

      <Button
        variant="contained"
        color="primary"
        onClick={() => setDialogOpen(true)}
        startIcon={<Add />}
        sx={{ marginBottom: 2 }}
      >
        Add Task
      </Button>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          fullWidth
          label="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton color="primary">
          <Search />
        </IconButton>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b
                  style={{
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    fontSize: 25,
                  }}
                >
                  Title
                </b>{" "}
              </TableCell>
              <TableCell
                style={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: 25,
                }}
              >
                Description
              </TableCell>
              <TableCell
                style={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: 25,
                }}
              >
                Category
              </TableCell>
              <TableCell
                style={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: 25,
                }}
              >
                Status
              </TableCell>
              <TableCell
                style={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: 25,
                }}
              >
                {" "}
                Date
              </TableCell>
              <TableCell
                style={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: 25,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.category}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.Date}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(task.id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(task.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={resetDialog}>
        <DialogTitle>{editId ? "Edit Task" : "Add New Task"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            name="title"
            value={taskDetails.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            name="description"
            value={taskDetails.description}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={taskDetails.category}
              onChange={handleInputChange}
            >
              <MuiMenuItem value="Work">Work</MuiMenuItem>
              <MuiMenuItem value="Personal">Personal</MuiMenuItem>
              <MuiMenuItem value="Study">Study</MuiMenuItem>
            </Select>
            <FormHelperText>Choose the task category</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={taskDetails.status}
              onChange={handleInputChange}
            >
              <MuiMenuItem value="Pending">Pending</MuiMenuItem>
              <MuiMenuItem value="In Progress">In Progress</MuiMenuItem>
              <MuiMenuItem value="Completed">Completed</MuiMenuItem>
            </Select>
            <FormHelperText>Choose the task status</FormHelperText>
          </FormControl>
          <TextField
            margin="dense"
            label=" Date"
            type="date"
            fullWidth
            name="Date"
            value={taskDetails.Date}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={resetDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={editId ? handleSaveEdit : handleAdd} color="primary">
            {editId ? "Save Changes" : "Save Task"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodoApp;
