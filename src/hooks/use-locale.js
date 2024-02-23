import { useContext } from "react";
import { LocaleContext } from "../contexts/locale-context";

const useLocale = () => {
  const context = useContext(LocaleContext);

  if (context === undefined) {
    throw new Error("LocaleContext was outside of LocaleContextProvider");
  }

  const { locale, toggleLocale } = context;
  return {
    locale,
    toggleLocale,
  };
};

export default useLocale;
