import React, { useEffect, useState } from "react";
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
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Delete, Edit, Add, Search } from "@mui/icons-material";
import ApiServices from "../services/ApiServices.jsx";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    category: "",
    status: "",
    dueDate: "",
  });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await ApiServices.getAllTodo();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const resetTaskDetails = () => {
    setTaskDetails({
      title: "",
      description: "",
      category: "",
      status: "",
      dueDate: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleAdd = async () => {
    if (!taskDetails.title.trim()) return;
    try {
      setLoading(true);
      const response = await ApiServices.addTodo(
        taskDetails.title,
        taskDetails.description,
        taskDetails.category,
        taskDetails.status,
        taskDetails.dueDate
      );
      setTasks([...tasks, response.data]);
      toast.success("Task added successfully");
      setAddDialogOpen(false);
      resetTaskDetails();
    } catch (error) {
      toast.error("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    console.log(id)
    const task = tasks.find((t) => t._id === id);
    setTaskDetails(task);
    setEditId(id);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      const response = await ApiServices.editTodo(editId, taskDetails);
      const updatedTask = response.data;
      setTasks(tasks.map((task) => (task.id === editId ? updatedTask : task)));
      toast.success("Task updated successfully");
      setEditDialogOpen(false);
      resetTaskDetails();
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ApiServices.deleteTodo(id);
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderTaskDialogContent = () => (
    <>
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
        <Select name="category" value={taskDetails.category} onChange={handleInputChange}>
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Personal">Personal</MenuItem>
          <MenuItem value="Study">Study</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="dense">
        <InputLabel>Status</InputLabel>
        <Select name="status" value={taskDetails.status} onChange={handleInputChange}>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <TextField
        margin="dense"
        label="Due Date"
        type="date"
        fullWidth
        name="dueDate"
        value={taskDetails.dueDate}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
      />
    </>
  );

  return (
    <Box p={3}>
      <ToastContainer />
      <Typography variant="h4" align="center" gutterBottom>
        📝 To-Do List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          resetTaskDetails();
          setAddDialogOpen(true);
        }}
        startIcon={<Add />}
        sx={{ mb: 2 }}
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
              {["Title", "Description", "Category", "Status", "Date", "Actions"].map((text, i) => (
                <TableCell key={i} style={{ fontWeight: "bold", fontSize: 18, fontFamily: "monospace" }}>
                  {text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.length ? (
              filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.category}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.dueDate?.split("T")[0]}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(task._id)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(task._id)}>
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

      {/* Add Task Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>{renderTaskDialogContent()}</DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            color="primary"
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Adding..." : "Add Task"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>{renderTaskDialogContent()}</DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveEdit}
            color="primary"
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodoApp;
