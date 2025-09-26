import React, { useState } from "react";
import "./App.css";
import { FaTrash, FaEdit } from "react-icons/fa";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setTask("");
  };

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = tasks.filter((_, i) => i !== index);
    setTasks(filtered);
    setEditIndex(null);
    setTask("");
  };

  return (
    <div className="todo-container">
      <h1>Get Things Done !</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="What is the task today?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>
          {editIndex !== null ? "Update" : "Add Task"}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index}>
            <span>{t}</span>
            <div className="icons">
              <FaEdit onClick={() => handleEdit(index)} />
              <FaTrash onClick={() => handleDelete(index)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
