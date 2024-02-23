import { useCallback, useMemo, createContext, useEffect } from "react";
import PropTypes from "prop-types";

import useLocalStorage from "../hooks/use-localstorage";

export const DarkModeContext = createContext();

const DarkModeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    "isDarkMode",
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  }, [setIsDarkMode]);

  const darkModeContextValue = useMemo(() => {
    return {
      isDarkMode,
      toggleDarkMode,
    };
  }, [isDarkMode, toggleDarkMode]);

  return (
    <DarkModeContext.Provider value={darkModeContextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};

DarkModeContextProvider.propTypes = {
  children: PropTypes.node,
};

export default DarkModeContextProvider;
