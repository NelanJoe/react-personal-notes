import { useState } from "react";
import PropTypes from "prop-types";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function FormCreateNote({ addNote }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // constant max length
  const MAX_LENGTH_TITLE = 50;

  const handleChangeTitle = (e) => {
    if (title.length <= MAX_LENGTH_TITLE) {
      setTitle(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !body) return;

    const newNote = {
      id: +new Date(),
      title,
      arcived: false,
      body,
      createdAt: new Date().toISOString(),
    };

    addNote(newNote);

    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="title">
              <strong>Title</strong>
            </label>
            <p>
              <strong>{MAX_LENGTH_TITLE - title.length}</strong>
            </p>
          </div>
          <input
            id="title"
            type="text"
            placeholder="Functional component"
            className="px-4 py-2 border rounded-md dark:text-white dark:bg-slate-800/40"
            value={title}
            onChange={handleChangeTitle}
            maxLength={MAX_LENGTH_TITLE}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="body">
            <strong>Body</strong>
          </label>
          <ReactQuill
            id="body"
            theme="snow"
            value={body}
            onChange={setBody}
            placeholder="Functional component is..."
            className="mb-16 h-36 "
          />
        </div>
        <button className="w-full px-4 py-2 text-lg font-medium text-white bg-purple-500 rounded-md">
          Add Note
        </button>
      </div>
    </form>
  );
}

FormCreateNote.propTypes = {
  addNote: PropTypes.func.isRequired,
};
