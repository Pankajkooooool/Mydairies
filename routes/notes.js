const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//Route:1 Get a User's notes using : GEt "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    f;
    console.error(error.message); //Idealy U must use logger or sqs
    res.status(500).send("Internal Server ERROR");
  }
});

//Route:2 Create a new note using :POST "/api/notes/addnote". login required
router.post(
  "/addnote",
  [
    body("title", "Minimum 2 character").isLength({ min: 2 }),
    body("description", "Minimum 5 character").isLength({ min: 5 }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //IF there are any bad requests  then
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message); //Idealy U must use logger or sqs
      res.status(500).send("Internal Server ERROR");
    }
  }
);

//Route:3 Update an existing note using :put "/api/notes/update". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //creating a new note object and updating fields separetely
    let newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //finding the note with the id and updating it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("NOT FOUND");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("NOT AUTHORISED");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message); //Idealy U must use logger or sqs
    res.status(500).send("Internal Server ERROR");
  }
});

//Route:4 Delete an existing note using :DELETE "/api/notes/delete". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {

  try {
    //finding the note with the id and deleting it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("NOT FOUND");
    }

    //Allow deltion only if user owns this page
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("NOT AUTHORISED");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Sucess: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message); //Idealy U must use logger or sqs
    res.status(500).send("Internal Server ERROR");
  }
});

module.exports = router;
