import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskInput from "./TaskInput";
import toast from "react-hot-toast";
function ToDoPage() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editedText, setEditedText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("None");
  const [deletingIndex, setDeletingIndex] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (priority, dueDate) => {
    if (task.trim() === "") return;
    const newTask = { text: task, completed: false, priority, dueDate };
    setTasks([...tasks, newTask]);
    setTask("");
    toast.success("Task added");
  };

  const handleDelete = (indexToDelete) => {
    setDeletingIndex(indexToDelete);
    setTimeout(() => {
      const newTasks = tasks.filter((_, i) => i !== indexToDelete);
      setTasks(newTasks);
      setDeletingIndex(null);
    }, 300);
    toast.success("Task deleted!");
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
    toast.success(
      updated[index].completed
        ? "Task marked complete!"
        : "Task marked incomplete!"
    );
  };

  const handleEdit = (index, currentText) => {
    setEditedText(currentText);
    setEditingIndex(index);
  };

  const handleSave = (index) => {
    const updated = [...tasks];
    updated[index].text = editedText;
    setTasks(updated);
    setEditedText("");
    setEditingIndex(null);
    toast.success("Task updated!");
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "Completed") return task.completed;
      if (filter === "Pending") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.text.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "Priority") {
        const order = { High: 3, Medium: 2, Low: 1 };
        return order[b.priority] - order[a.priority];
      }
      if (sortBy === "DueDate") {
        return (
          new Date(a.dueDate || "2100-01-01") -
          new Date(b.dueDate || "2100-01-01")
        );
      }
      if (sortBy === "Text") {
        return a.text.localeCompare(b.text);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-8 text-center">
          To-Do List
        </h1>

        {/* Task Input */}
        <TaskInput task={task} setTask={setTask} handleAdd={handleAdd} />
        <div className="mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700 text-white rounded px-3 py-2 transition-all duration-200 transform hover:scale-105 "
          >
            <option value="None">Sort : None</option>
            <option value="Priority">Sort : Priority</option>
            <option value="DueDate">Sort : Due Date</option>
            <option value="Text">Sort : A-Z</option>
          </select>
        </div>

        {/* Filters */}
        <div className="flex gap-2 my-4">
          <button
            onClick={() => setFilter("All")}
            className={`px-3 py-1 rounded transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              filter === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Completed")}
            className={`px-3 py-1 rounded transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              filter === "Completed"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("Pending")}
            className={`px-3 py-1 rounded transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              filter === "Pending"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Pending
          </button>
        </div>

        {/* Search */}
        <div className="w-full max-w-xl mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 text-black"
          />
        </div>

        {/* Task List */}
        {filteredTasks.map((t, index) => (
          <TaskItem
            key={index}
            index={index}
            task={t}
            isEditing={editingIndex === index}
            isDeleting={deletingIndex === index}
            setEditedText={setEditedText}
            editedText={editedText}
            handleDelete={handleDelete}
            handleSave={handleSave}
            handleEdit={handleEdit}
            toggleComplete={toggleComplete}
          />
        ))}
        {filteredTasks.length === 0 && (
          <p className="text-gray-400 mt-8 text-center">No tasks to show.</p>
        )}
      </div>
    </div>
  );
}

export default ToDoPage;
