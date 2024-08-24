const { ObjectId } = require("mongodb");

const Note = require('../models/note.js');

const fetchNote = async (req, res) =>{
    // Get the Id off the Url
    const noteId = req.params.id;
    // Find the Id
    const note = await Note.findById(noteId)
    // Respond to it
    res.json({ note });
};

const fetchNotes = async (req, res) =>{
    //Find a note
    const notes = await Note.find();
    //Respond to it
    res.json({ notes });
};

const createNotes = async (req, res) =>{
    //Get the sent data off request body
    const {title, body} = req.body;

    //Create note with it 
    const note = await Note.create({
        title,
        body,
    });

    //Respond with the new one
    res.json({ note });
};

const updateNotes = async (req, res) =>{
    // Get the Id off the Url
    const noteId = req.params.id;
    // Get the request body
    const {title, body} = req.body;
    // Find the Id and update
    await Note.findByIdAndUpdate(noteId, {
        title,
        body,
    });

    // Find the Updated Id
    const note = await Note.findById(noteId);

    // Respond with it
    res.json({ note });
};

const deleteNotes = async (req, res) => {
    try {
      // Get the id off the url and convert it to a MongoDB ObjectId
      const noteId = new ObjectId(req.params.id);
  
      // Find and delete the note by _id
      const result = await Note.deleteOne({ _id: noteId });
  
      if (result.deletedCount === 1) {
        // Respond with success if a record was deleted
        res.json({ success: "Record Deleted" });
      } else {
        // Respond with failure if no record was found
        res.status(404).json({ error: "Record not found" });
      }
    } catch (error) {
      // Handle errors (like invalid ObjectId format)
      res.status(400).json({ error: "Invalid ID format" });
    }
  };

  module.exports = {
    fetchNote,
    fetchNotes,
    createNotes,
    updateNotes,
    deleteNotes,
  };