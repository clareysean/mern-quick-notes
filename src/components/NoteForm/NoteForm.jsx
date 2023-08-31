export default function NoteForm({
  handleSubmit,
  handleChange,
  submitOnEnter,
  isEditMode,
  noteData,
}) {
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
            value={noteData.text}
            onChange={handleChange}
            onKeyDown={submitOnEnter}
            required
          />
          <button type="submit">Save Note</button>
        </form>
      </div>
    </div>
  );
}
