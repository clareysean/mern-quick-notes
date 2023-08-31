import { useState } from "react";

export default function NoteForm({
  handleSubmit,
  submitOnEnter,
  isEditMode,
  user,
  noteContent,
  toggleEdit,
}) {
  const [updateFormData, setUpdateFormData] = useState({
    text: noteContent.text,
    user: user,
  });
  const [error, setError] = useState("");

  function handleChange(evt) {
    setUpdateFormData({
      ...updateFormData,
      [evt.target.name]: evt.target.value,
    });
    setError("");
  }
  return (
    <div>
      <div className={`form-container ${isEditMode ? "" : "hidden"}`}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>New Note:</label>
          <textarea
            type="text"
            rows="7"
            cols="40"
            name="text"
            placeholder="New note..."
            value={updateFormData.text}
            onChange={handleChange}
            onKeyDown={submitOnEnter}
            required
          />
          <div className="button-row">
            <button type="submit">Save Note</button>
            <button type="button" onClick={toggleEdit}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
