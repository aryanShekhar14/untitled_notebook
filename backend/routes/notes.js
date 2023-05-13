const express = require('express');
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route : 1 //Get all the notes: GET "/api/note/fetchallnotes" Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//Route : 2 //Add a new note using: POST "/api/note/addnote" Login required
router.post("/addnote", fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 charcters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//Route : 3 //Update an existing note: PUT "/api/note/updatenote" Login required
router.put("/updatenote/:id", fetchuser, [ //using 'PUT' for update //POST can also be used
], async (req, res) => {

    const { title, description, tag } = req.body;

    try {
        //Create a new note object
        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }
        //find the note to be updated;
        let note = await Note.findById(req.params.id);//find note using id in url
        if (!note) {
            return res.status(404).send("Not found");
        }

        if (note.user.toString() !== req.user.id) { //if actual note id is equal to auth-token id
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })//new:true gives note after update
        //By default findByIdAndUpdate return object before update
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//Route : 4 //Delete an existing note: DELETE "/api/note/deletenote" Login required
router.delete("/deletenote/:id", fetchuser, [ //using 'PUT' for update //POST can also be used
], async (req, res) => {

    try {
        //find the note to be deleted;
        let note = await Note.findById(req.params.id);//find note using id in url
        if (!note) {
            return res.status(404).send("Not found");
        }

        if (note.user.toString() !== req.user.id) { //if actual note id is equal to auth-token id
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note ha been deleted", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})
module.exports = router;