import { useNavigate, useParams } from "react-router-dom";
import { Trash2Icon, ArchiveIcon, ArchiveRestoreIcon } from "lucide-react";
import DOMPurify from "dompurify";
import ReactHTMLParser from "react-html-parser";

import BackButton from "../components/back-button";

import { useNote } from "../hooks/use-note";
import { showFormattedDate } from "../utils";
import { deleteNote, archiveNote, unarchiveNote } from "../utils/api";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DetailNote() {
  const navigate = useNavigate();

  const { noteId } = useParams();
  const { note, isLoading, error } = useNote(noteId);

  const queryClient = useQueryClient();

  const { mutate: deleteNoteHandler } = useMutation({
    mutationFn: (id) => deleteNote(id),
    onSettled: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  const { mutate: archivedNoteHandler } = useMutation({
    mutationFn: (id) => archiveNote(id),
    onSettled: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  const { mutate: unarchivedNoteHandler } = useMutation({
    mutationFn: (id) => unarchiveNote(id),
    onSettled: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  const handleArcivedNote = () => {
    archivedNoteHandler(note.id);

    toast.success("Successfully archived note");

    navigate(-1);
  };

  const handleUnArcivedNote = () => {
    unarchivedNoteHandler(note.id);

    toast.success("Successfully unarcived note");

    navigate(-1);
  };

  const handleDeleteNote = () => {
    deleteNoteHandler(note.id);

    toast.success("Successfully delete note");

    navigate(-1);
  };

  const sanitizedData = DOMPurify.sanitize(note.body);

  return (
    <section>
      <BackButton />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {note ? (
            <section className="relative">
              <div className="fixed bottom-0 right-0 transform -translate-y-12 -translate-x-4 sm:-translate-x-4 md:-translate-x-4 lg:-translate-y-8 lg:-translate-x-24 2xl:-translate-x-[24rem] z-[9999]">
                <div className="flex flex-row items-center gap-3">
                  {note.archived ? (
                    <button onClick={handleUnArcivedNote}>
                      <div className="flex items-center justify-center w-10 h-10 bg-white border-2 border-purple-900 shadow-md dark:bg-gray-800 rounded-xl">
                        <ArchiveRestoreIcon className="w-5 h-5" />
                      </div>
                    </button>
                  ) : (
                    <button onClick={handleArcivedNote}>
                      <div className="flex items-center justify-center w-10 h-10 bg-white border-2 border-purple-900 shadow-md dark:bg-gray-800 rounded-xl">
                        <ArchiveIcon className="w-5 h-5" />
                      </div>
                    </button>
                  )}
                  <button onClick={handleDeleteNote}>
                    <div className="flex items-center justify-center w-10 h-10 bg-white border-2 border-purple-900 shadow-md dark:bg-gray-800 rounded-xl">
                      <Trash2Icon className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </div>
              <div className="mt-8">
                <div className="mb-8 space-y-1">
                  <h2 className="text-3xl font-semibold lg:text-6xl">
                    {note.title}
                  </h2>
                  <p className="italic opacity-60">
                    {showFormattedDate(note.createdAt)}
                  </p>
                </div>
                <p className="break-words">{ReactHTMLParser(sanitizedData)}</p>
              </div>
            </section>
          ) : (
            <p className="text-red-500">
              <strong>Note not found.</strong>
            </p>
          )}
        </>
      )}
      {error && <p>Error: {error}</p>}
    </section>
  );
}
