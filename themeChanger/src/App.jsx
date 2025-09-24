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
        <button onClick={toggleTheme}>Toggle Theme</button>
        <Toolbar />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
