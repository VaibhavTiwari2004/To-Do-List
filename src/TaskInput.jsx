import { useState } from "react";

function TaskInput({ task, setTask, handleAdd }) {
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const handleSubmit = () => {
    handleAdd(priority, dueDate);
    setDueDate("");
    setPriority("Low");
  };
  return (
    <div className="flex gap-2 w-full max-w-xl mb-6">
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border border-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-white px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="bg-gray-700 text-white dark:bg-gray-800 dark:text-white rounded px-2 py-2"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="bg-gray-700  text-white dark:bg-gray-800 dark:text-white px-2 rounded"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 rounded font-medium text-white bg-green-500 hover:bg-green-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        Add
      </button>
    </div>
  );
}
export default TaskInput;
