const express = require('express');
const app = express();
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
// Middleware to parse JSON data
router.use(express.json());

// ROUTE 1:
// Get all the notes: GET "api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Server error occurred");
    }
});

// ROUTE 2:
// Add a new Note using: POST "api/notes/addnote"
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Server error occurred");
    }
});

//ROUTE 3: Update an existing node : PUT"api/notes/updatenote"

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    // Find the note to be updated and update
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found"); }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json(note);
});


//ROUTE 4: Delete an existing node : PUT"api/notes/updatenote"

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        // Delete the note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Successfully Deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Server error occurred");
    }
});

module.exports = router