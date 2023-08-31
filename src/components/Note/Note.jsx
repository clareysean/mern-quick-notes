import NoteForm from "../NoteForm/NoteForm";

import { useState } from "react";

export default function Note({
  note,
  user,
  deleteNote,
  handleChange,
  submitOnEnter,
  noteData,
  handleSubmit,
}) {
  const [isEditMode, setIsEditMode] = useState(false);

  async function handleToggleEdit() {
    setIsEditMode(!isEditMode);
  }

  return (
    <>
      {" "}
      <div className={`note-card ${isEditMode ? "hidden" : ""}`}>
        <h3>{user.name}</h3>
        <p>{note.text}</p>
        <footer className="note-footer">Created at: {note.createdAt}</footer>
        <button onClick={() => deleteNote(note._id)}>Delete Note</button>
        <button onClick={handleToggleEdit}>Edit Note</button>
      </div>
      <NoteForm
        handleChange={handleChange}
        submitOnEnter={submitOnEnter}
        note={note}
        handleSubmit={handleSubmit}
        noteData={noteData}
        isEditMode={isEditMode}
      />
    </>
  );
}
