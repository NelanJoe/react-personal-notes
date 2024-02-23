import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  LogOutIcon,
  MenuIcon,
  MoonStarIcon,
  SunDimIcon,
  XIcon,
} from "lucide-react";

import useDarkMode from "../hooks/use-darkmode";
import useLocale from "../hooks/use-locale";

export default function Header({ onLogout, autchedUser }) {
  const [isShow, setIsShow] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { locale, toggleLocale } = useLocale();

  return (
    <header className="fixed top-0 left-0 z-30 w-full border-b border-purple-500 backdrop-filter backdrop-blur-md bg-white/30 dark:bg-slate-800/50">
      <nav>
        <div className="flex flex-row items-center justify-between h-16 max-w-6xl mx-4 lg:mx-auto">
          <h1 className="text-2xl font-semibold">
            <Link to="/">
              {locale === "id" ? (
                <>
                  <span className="text-purple-400">Catatan</span>Pribadi
                </>
              ) : (
                <>
                  Personal<span className="text-purple-400">Notes</span>
                </>
              )}
            </Link>
          </h1>
          <div className="hidden lg:gap-3 lg:items-center lg:flex">
            {autchedUser !== null && (
              <Link to="/notes/archived" className="font-semibold underline">
                {locale === "id" ? "Terarsip" : "Archived"}
              </Link>
            )}

            <button
              onClick={() => toggleLocale()}
              className="px-1.5 py-1 border rounded-md shadow"
            >
              {locale === "id" ? "en" : "id"}
            </button>

            <button
              onClick={() => toggleDarkMode()}
              className="p-1 border rounded-md shadow"
            >
              {isDarkMode ? (
                <MoonStarIcon className="w-5 h-5" />
              ) : (
                <SunDimIcon />
              )}
            </button>

            {autchedUser !== null && (
              <button onClick={() => onLogout()}>
                <div className="flex flex-row items-center gap-1">
                  <LogOutIcon className="w-5 h-5" />
                  <span className="capitalize">{autchedUser.name}</span>
                </div>
              </button>
            )}
          </div>

          <div className="block lg:hidden" onClick={() => setIsShow(!isShow)}>
            {!isShow ? <MenuIcon /> : <XIcon />}
          </div>
        </div>
        {isShow && (
          <div className="flex flex-col gap-2 mx-4 mb-4">
            {autchedUser !== null && (
              <Link to="/notes/archived" className="font-semibold underline">
                {locale === "id" ? "Terarsip" : "Archived"}
              </Link>
            )}

            <button
              onClick={() => toggleLocale()}
              className="px-1.5 py-1 border rounded-md shadow h-fit w-fit"
            >
              {locale === "id" ? "en" : "id"}
            </button>

            <button
              onClick={() => toggleDarkMode()}
              className="p-1 border rounded-md shadow h-fit w-fit"
            >
              {isDarkMode ? (
                <MoonStarIcon className="w-5 h-5" />
              ) : (
                <SunDimIcon />
              )}
            </button>

            {autchedUser !== null && (
              <button onClick={() => onLogout()}>
                <div className="flex flex-row justify-center items-center px-1 py-1.5 rounded-md border">
                  <LogOutIcon className="w-5 h-5" />
                  <span className="capitalize">{autchedUser.name}</span>
                </div>
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  autchedUser: PropTypes.object,
  onLogout: PropTypes.func,
};
