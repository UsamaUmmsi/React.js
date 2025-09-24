import { useState } from "react";
import ThemeContext from "./ThemeContext";
import Toolbar from "./Toolbar";
import "./index.css";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`app ${theme}`}>
        <h1>Theme Toggle with useContext</h1>
        <button className="bg-black px-5 py-5 rounded-2xl m-10 text-white hover:bg-orange-300 hover:text-black hover:scale-50 transite-1 duration-600 " onClick={toggleTheme}>Toggle Theme</button>
        <Toolbar />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
  