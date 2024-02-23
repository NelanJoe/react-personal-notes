import { useEffect, useState } from "react";

import { getNote } from "../utils/api";

export const useNote = (noteId) => {
  const [note, setNote] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActiveNotes = async (noteId) => {
    setisLoading(true);
    try {
      const { data, error } = await getNote(noteId);

      setNote(data ?? []);
      setError(error);

      setisLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchActiveNotes(noteId);
  }, [noteId]);

  return { note, isLoading, error };
};
