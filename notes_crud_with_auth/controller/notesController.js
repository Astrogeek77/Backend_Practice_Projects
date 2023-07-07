const noteModel = require('../models/note');

const getNotes = async (req, res) => {

  try {
    const notes = await noteModel.find({ userId: req.id });
    res.status(200).json(notes);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting notes' });
  }
}

const createNote = async (req, res) => {

  const { title, content } = req.body;

  const newNote = new noteModel({
    title,
    content,
    userId: req.id
  });

  try {
    await newNote.save();
    res.status(201).json(newNote);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating note' });
  }

}

const updateNote = async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  const newNote = {
    title: title,
    content: content,
    userId: req.id
  }
  try {

    await noteModel.findByIdAndUpdate(id, newNote, { new: true });
    res.status(200).json(newNote);

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating note' });
  }
}

const deleteNote = async (req, res) => {
  const id = req.params.id;

  try {

    const note = await noteModel.findByIdAndRemove(id);
    res.status(202).json(note);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting note' });
  }
}

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote
};
