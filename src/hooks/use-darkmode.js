import { useContext } from "react";
import { DarkModeContext } from "../contexts/dark-mode-context";

const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (context === undefined) {
    throw new Error("DarkModeContext was outside of DarkModeProvider");
  }

  const { isDarkMode, toggleDarkMode } = context;
  return {
    isDarkMode,
    toggleDarkMode,
  };
};

export default useDarkMode;
