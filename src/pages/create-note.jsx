import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import FormCreateNote from "../components/form-create-note";
import { addNote } from "../utils/api";
import toast from "react-hot-toast";

export default function CreateNote() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: addNoteHandler } = useMutation({
    mutationFn: (newNote) => addNote(newNote),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const createNote = (note) => {
    addNoteHandler(note);

    toast.success("Successfully add new note");

    navigate("/");
  };

  return (
    <section className="p-6 border border-purple-500 border-dashed rounded-md">
      <h2 className="text-xl font-medium text-center">Create Note</h2>
      <FormCreateNote addNote={createNote} />
    </section>
  );
}
