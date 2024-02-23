import PropTypes from "prop-types";
import { createContext, useCallback, useMemo } from "react";
import useLocalStorage from "../hooks/use-localstorage";

export const LocaleContext = createContext();

export default function LocaleContextProvider({ children }) {
  const [locale, setLocale] = useLocalStorage("language", "id");

  const toggleLocale = useCallback(() => {
    setLocale((prevLocale) => (prevLocale === "id" ? "en" : "id"));
  }, [setLocale]);

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale, toggleLocale]);

  return (
    <LocaleContext.Provider value={localeContextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

LocaleContextProvider.propTypes = {
  children: PropTypes.node,
};
