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
  handleUpdate,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState("");

  async function handleToggleEdit() {
    setIsEditMode(!isEditMode);
  }

  async function handleSaveClick(e, updateFormData, note) {
    try {
      await handleUpdate(e, updateFormData, note);
      setIsEditMode(!isEditMode);
    } catch {
      setError("Failed to update note!");
    }
  }

  const createdAtDate = new Date(note.createdAt);

  return (
    <>
      {" "}
      <div className={`note-card ${isEditMode ? "hidden" : ""}`}>
        <h3>{user.name}</h3>
        <p>{note.text}</p>
        <footer className="note-footer">
          Created at: {createdAtDate.toLocaleDateString()}
        </footer>
        <button onClick={() => deleteNote(note._id)}>Delete Note</button>
        <button onClick={handleToggleEdit}>Edit Note</button>
      </div>
      <NoteForm
        handleChange={handleChange}
        submitOnEnter={submitOnEnter}
        toggleEdit={handleToggleEdit}
        note={note}
        handleSubmit={handleSubmit}
        noteData={noteData}
        isEditMode={isEditMode}
        user={user}
        noteContent={note}
        handleSaveClick={handleSaveClick}
      />
    </>
  );
}
