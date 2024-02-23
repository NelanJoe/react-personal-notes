import PropTypes from "prop-types";
import useLocale from "../hooks/use-locale";

export default function SearchNote({ keyword, onChangeHandler }) {
  const { locale } = useLocale();

  return (
    <div className="w-full lg:w-1/2">
      <input
        type="text"
        placeholder={`${
          locale === "id" ? "Cari catatan..." : "Search notes..."
        }`}
        className="px-4 py-1.5 border rounded-md w-full dark:bg-slate-800/40  focus:outline-purple-500"
        value={keyword}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
    </div>
  );
}

SearchNote.propTypes = {
  keyword: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};
