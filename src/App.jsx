import { Routes, Route, Link } from "react-router-dom";
import ToDoPage from "./ToDoPage";
import About from "./About";
import { useEffect, useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col items-center p-8">
      <nav className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/about" className="hover:text-blue-400">
          About
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-auto px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"} "
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<ToDoPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
