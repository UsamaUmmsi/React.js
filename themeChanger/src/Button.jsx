import { useContext } from "react";
import ThemeContext from "./ThemeContext";

function Button() {
  const theme = useContext(ThemeContext);

  return (
    <button className={`btn ${theme}`} style={{ margin: "5px" }}>
      I am {theme} button
    </button>
  );
}

export default Button;
