import React, { useState, useEffect } from "react"; // Don't forget to import React
import { getNotes, addNote, deleteNote } from "../../utilities/notes-service";
import { getUser } from "../../utilities/users-service";
import Note from "../../components/Note/Note";

export default function Notelist({ user }) {
  const [notes, setNotes] = useState(null);
  const [noteData, setNoteData] = useState({
    text: "",
    user: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(); // Wait for getUser to complete
        const fetchedNotes = await getNotes(user); // Wait for getNotes to complete

        setNoteData((prevNoteData) => ({
          ...prevNoteData,
          user: user,
        }));
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  function handleChange(evt) {
    setNoteData({ ...noteData, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt, data) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      const newNote = await addNote(data);
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setNoteData({ ...noteData, text: "" });
    } catch {
      setError("Failed to create note!");
    }
  }

  async function handleDeleteNote(noteId) {
    try {
      await deleteNote(noteId);
      const fetchedNotes = await getNotes(user);
      setNotes(fetchedNotes);
    } catch {
      setError("Failed to delete note!");
    }
  }

  const submitOnEnter = (evt) => {
    if (evt.key === "Enter" && !evt.shiftKey) {
      evt.preventDefault();
      handleSubmit(evt);
    }
  };

  return (
    <div className="notes-list-container">
      {notes && notes.length > 0 ? (
        notes.map((n, i) => (
          <>
            {" "}
            <Note
              key={i}
              note={n}
              user={user}
              deleteNote={handleDeleteNote}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              noteData={noteData}
            />
          </>
        )) // *
      ) : (
        <h4>No notes to display!</h4>
      )}
      <div>
        <div className="form-container">
          <form
            autoComplete="off"
            onSubmit={(evt) => handleSubmit(evt, noteData)}
          >
            <label>New Note:</label>
            <textarea
              type="text"
              rows="7"
              cols="40"
              name="text"
              placeholder="New note..."
              value={noteData.text}
              onChange={handleChange}
              onKeyDown={submitOnEnter}
              required
            />
            <button type="submit">Add Note</button>
          </form>
        </div>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}

// * gotta use those brackets around options in ternary

// const deleteNote = (noteId) => {
//   setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
// };
