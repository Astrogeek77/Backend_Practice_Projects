const express = require('express');
const { getNotes, createNote, updateNote, deleteNote } = require('../controller/notesController');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/', auth, getNotes);

router.post('/', auth, createNote);

router.put('/:id', auth, updateNote);

router.delete('/:id', auth, deleteNote);

module.exports = router;
