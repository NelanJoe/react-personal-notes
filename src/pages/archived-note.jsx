import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

import NoteItem from "../components/note-item";
import SearchNote from "../components/search-note";
import useLocale from "../hooks/use-locale";
import { getArchivedNotes } from "../utils/api";

export default function ArchivedNote({ keyword, onChangeHandler }) {
  const { locale } = useLocale();
  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getArchivedNotes,
  });

  const [filteredArchivedNotes, setFilteredArchivedNotes] = useState([]);

  useEffect(() => {
    const newFilteredNotes = notes?.data?.filter((note) => {
      return note?.title
        ?.toLocaleLowerCase()
        ?.includes(keyword?.toLocaleLowerCase());
    });

    setFilteredArchivedNotes(newFilteredNotes);
  }, [notes, keyword]);

  return (
    <section>
      <div className="flex flex-col justify-between mb-8 lg:items-center lg:flex-row">
        <h2 className="my-4 text-xl font-semibold underline lg:text-2xl decoration-purple-500 decoration-dashed underline-offset-4">
          {locale === "id" ? "Catatan Terarsip" : "Archived Notes"}
        </h2>
        <SearchNote keyword={keyword} onChangeHandler={onChangeHandler} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading ? (
          <p>Loading....</p>
        ) : (
          <>
            {filteredArchivedNotes?.length > 0 ? (
              filteredArchivedNotes?.map((note) => (
                <NoteItem key={note.id} note={note} />
              ))
            ) : (
              <p className="italic text-red-500">
                <strong>Arcived Note not found.</strong>
              </p>
            )}
          </>
        )}
        {isError && <p>Error: {error.message}</p>}
      </div>
    </section>
  );
}

ArchivedNote.propTypes = {
  keyword: PropTypes.string,
  onChangeHandler: PropTypes.func,
};
