import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import PropTypes from "prop-types";

import NoteItem from "../components/note-item";
import SearchNote from "../components/search-note";
import useLocale from "../hooks/use-locale";
import { useQuery } from "@tanstack/react-query";
import { getActiveNotes } from "../utils/api";

export default function Home({ keyword, onChangeHandler }) {
  const { locale } = useLocale();
  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getActiveNotes,
  });

  const [filteredActiveNotes, setFilteredActiveNotes] = useState([]);

  useEffect(() => {
    const newFilteredNotes = notes?.data?.filter((note) => {
      return note?.title
        ?.toLocaleLowerCase()
        ?.includes(keyword?.toLocaleLowerCase());
    });

    setFilteredActiveNotes(newFilteredNotes);
  }, [notes, keyword]);

  return (
    <section className="relative">
      <div className="fixed bottom-0 right-0 transform -translate-y-12 -translate-x-4 sm:-translate-x-4 md:-translate-x-4 lg:-translate-y-8 lg:-translate-x-24 2xl:-translate-x-[24rem] z-[9999]">
        <Link to="/notes/create">
          <div className="flex items-center justify-center w-10 h-10 bg-white border-2 border-purple-500 shadow-md dark:bg-gray-800 rounded-xl">
            <PlusIcon />
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-between mb-8 lg:items-center lg:flex-row">
        <h2 className="my-4 text-xl font-semibold underline lg:text-2xl decoration-purple-500 decoration-dashed underline-offset-4">
          {locale === "id" ? "Catatan Aktif" : "Active Notes"}
        </h2>
        <SearchNote keyword={keyword} onChangeHandler={onChangeHandler} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {filteredActiveNotes?.length > 0 ? (
              filteredActiveNotes.map((note) => (
                <NoteItem key={note.id} note={note} />
              ))
            ) : (
              <p className="italic text-red-500">
                <strong>Active Note not found.</strong>
              </p>
            )}
          </>
        )}
        {isError && <p>Error: {error.message}</p>}
      </div>
    </section>
  );
}

Home.propTypes = {
  keyword: PropTypes.string,
  onChangeHandler: PropTypes.func,
};
