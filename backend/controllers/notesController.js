const Note = require('../models/Note');

// @desc    Get user notes
// @route   GET /api/notes
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ pinned: -1, createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new note
// @route   POST /api/notes
const createNote = async (req, res) => {
    try {
        const { content, type, trip, mood, date, time, pinned } = req.body;
        const note = new Note({
            user: req.user._id,
            content,
            type,
            trip,
            mood,
            date,
            time,
            pinned
        });
        const createdNote = await note.save();
        res.status(201).json(createdNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note && note.user.toString() === req.user._id.toString()) {
            note.content = req.body.content || note.content;
            note.favorite = req.body.favorite !== undefined ? req.body.favorite : note.favorite;
            note.pinned = req.body.pinned !== undefined ? req.body.pinned : note.pinned;
            const updatedNote = await note.save();
            res.json(updatedNote);
        } else {
            res.status(404).json({ message: 'Note not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note && note.user.toString() === req.user._id.toString()) {
            await note.deleteOne();
            res.json({ message: 'Note removed' });
        } else {
            res.status(404).json({ message: 'Note not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
