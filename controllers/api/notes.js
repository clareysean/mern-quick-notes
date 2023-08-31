const Note = require("../../models/note");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports = {
  index,
  create,
  delete: deleteNote,
  update,
};

async function index(req, res) {
  try {
    const notes = await Note.find({ user: req.body._id });
    console.log(notes);
    res.json(notes);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function create(req, res) {
  const { text, user } = req.body;

  try {
    const newNote = new Note({
      text,
      user,
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteNote(req, res) {
  try {
    const noteId = req.params.id;

    const noteToDelete = Note.findById(noteId);
    if (!noteToDelete) {
      return res.status(404).json({ message: "File not found" });
    }
    await noteToDelete.remove();
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}

async function update(req, res) {
  console.log(`note id in controller is ${req.params.id}`);
  console.log(req.body);
  try {
    const noteId = req.params.id;
    await Note.findByIdAndUpdate(noteId, { text: req.body.text });
    res.status(200).json({ message: "File updated successfully" });
  } catch (error) {
    console.error("Error updating file:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}
