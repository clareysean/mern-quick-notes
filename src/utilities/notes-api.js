import sendRequest from "./send-request";
const BASE_URL = "/api/notes";

export function getNotesFromDB(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export function deleteNote(noteData) {
  console.log(`in the notes api`);
  return sendRequest(`${BASE_URL}/${noteData}`, "DELETE");
}

export function addNote(noteData) {
  return sendRequest(`${BASE_URL}/new`, "POST", noteData);
}
