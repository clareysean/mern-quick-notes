const express = require("express");
const router = express.Router();
const notesCtrl = require("../../controllers/api/notes");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

console.log(`in the router`);

router.post("/", ensureLoggedIn, notesCtrl.index);
router.post("/new", ensureLoggedIn, notesCtrl.create);
router.delete("/:id", ensureLoggedIn, notesCtrl.delete);
router.put("/:id/update", ensureLoggedIn, notesCtrl.update);

module.exports = router;
