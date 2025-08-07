function TaskItem({
  index,
  task,
  isEditing,
  isDeleting,
  setEditedText,
  editedText,
  handleDelete,
  handleSave,
  handleEdit,
  toggleComplete,
}) {
  return (
    <li
      className={`flex items-center justify-between bg-gray-200 dark:bg-gray-800 p-4 rounded transition-opacity duration-500 opacity-0 animate-fadeIn hover:scale-[1.02] hover:shadow-lg ${
        isDeleting
          ? "opacity-0 -translate-y-2 scale-95"
          : "opacity-100 translate-y-0"
      }`}
    >
      {isEditing ? (
        <div className="flex w-full gap-2">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="flex-grow px-2 py-1 rounded bg-gray-700 text-white"
          />
          <button
            onClick={() => handleSave(index)}
            className="px-3 py-1 rounded font-medium text-white bg-green-500 hover:bg-green-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <span
            className={`flex-grow max-w-[70%]${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.text}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => toggleComplete(index)}
              className="px-4 py-2 rounded font-medium text-white bg-yellow-500 hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {task.completed ? "Undo" : "Done"}
            </button>
            <button
              onClick={() => handleEdit(index, task.text)}
              className="px-3 py-1 rounded font-medium text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(index)}
              className="px-3 py-1 rounded font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Delete
            </button>
            <span
              className={`px-2 py-1 text-xs rounded font-semibold ${
                task.priority === "High"
                  ? "bg-red-500"
                  : task.priority === "Medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="text-sm text-gray-300">Due:{task.dueDate}</span>
            )}
          </div>
        </>
      )}
    </li>
  );
}
export default TaskItem;
