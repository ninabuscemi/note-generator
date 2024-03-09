// Importing required modules and dependencies
const notesRouter = require('express').Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Importing UUID for generating unique identifiers

// Importing helper functions for file system operations
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

// GET Route to fetch all notes
notesRouter.get('/', (req, res) => {
    // Logging incoming request method and path
    console.info(`${req.method} request received for notes`);
    // Reading data from file and sending it as JSON response
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route to add new notes
notesRouter.post('/', (req, res) => {
    // Logging incoming request method and purpose
    console.info(`${req.method} request received to add a note`);
  
    const { title, text } = req.body; // Extracting title and text from request body
  
    if (req.body) { // Checking if request body exists
      const newNote = {
        title,
        text,
        note_id: uuidv4(), // Generating a unique ID for the new note
      };
  
      // Appending the new note to the database file
      readAndAppend(newNote, './db/db.json');
      // Sending success response
      res.json(`Note added successfully`);
    } else {
      // Sending error response if request body is empty
      res.error('Error in adding note');
    }
});

// DELETE route to delete a note by its ID
notesRouter.delete('/:id', (req, res) => {
  const idToDelete = req.params.id; // Extracting note ID from request parameters

  readFromFile(path.join(__dirname, '../db/db.json'))
    .then(data => {
      let notes = JSON.parse(data); // Parsing JSON data from file

      console.log('Logging notes before deletion:', notes); // Logging notes before deletion

      const noteIndex = notes.findIndex(note => note.note_id === idToDelete); // Finding index of note to delete

      console.log('Note Index to delete:', noteIndex); // Logging index of note to delete

      if (noteIndex === -1) { // Checking if note exists
        return res.status(404).json({ error: 'Note not found!' }); // Sending error response if note not found
      }

      notes.splice(noteIndex, 1); // Removing note from array

      // Writing updated notes to file
      writeToFile(path.join(__dirname, '../db/db.json'), notes);

      return res.status(204).send(); // Sending success response
    })
    .catch(err => {
      console.error('Error:', err); // Logging error
      return res.status(500).json({ error: 'Error reading or writing to the database file!' }); // Sending error response
    });
});

module.exports = notesRouter; // Exporting router for use in other files