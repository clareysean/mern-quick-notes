import * as notesAPI from "./notes-api";

export async function getNotes(user) {
  const notes = await notesAPI.getNotesFromDB(user);
  return notes;
}

export async function addNote(noteData) {
  return notesAPI.addNote(noteData);
}

export async function deleteNote(noteId) {
  console.log(`in the notes service`);
  console.log(`NOTE SENT IS${noteId}`);
  return notesAPI.deleteNote(noteId);
}

export async function updateNote(noteData, note) {
  return notesAPI.updateNote(noteData, note);
}
