import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import ReactHTMLParser from "react-html-parser";

import { typedNote } from "../types";

import { showFormattedDate } from "../utils";

export default function NoteItem({ note }) {
  const sanitizedData = DOMPurify.sanitize(note.body);

  return (
    <Link to={`/notes/${note.id}`}>
      <div className="h-full p-4 space-y-2 border border-l-4 rounded-md shadow-md cursor-pointer border-l-purple-500">
        <h3 className="text-xl font-semibold">{note.title}</h3>
        <p className="italic opacity-60 text-[14px] break-words">
          {showFormattedDate(note.createdAt)}
        </p>
        <p className="text-justify text-[14px] break-words">
          {ReactHTMLParser(sanitizedData)}
        </p>
      </div>
    </Link>
  );
}

NoteItem.propTypes = {
  note: PropTypes.shape(typedNote).isRequired,
};
