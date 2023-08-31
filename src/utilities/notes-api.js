import sendRequest from "./send-request";
const BASE_URL = "/api/notes";

export function getNotesFromDB(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function deleteNote(noteId) {
  console.log(`in the notes api`);
  return sendRequest(`${BASE_URL}/${noteId}`, "DELETE");
}

export function addNote(noteData) {
  return sendRequest(`${BASE_URL}/new`, "POST", noteData);
}

export function updateNote(noteData, note) {
  const noteId = note._id;

  return sendRequest(`${BASE_URL}/${noteId}/update`, "PUT", noteData);
}
