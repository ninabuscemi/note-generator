const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

//Import helper functions
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for notes
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a tip`);
  
    const { title, text, note_id } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
});

// DELETE route to delete a note by ID
notes.delete('/:id', (req, res) => {
  const idToDelete = req.params.id;

  readFromFile(path.join(__dirname, '../db/db.json'))
    .then(data => {
      let notes = JSON.parse(data);

      console.log('Notes before deletion:', notes);

      const noteIndex = notes.findIndex(note => note.note_id === idToDelete);

      console.log('Note Index to delete:', noteIndex);

      if (noteIndex === -1) {
        return res.status(404).json({ error: 'Note not found' });
      }

      notes.splice(noteIndex, 1);

      writeToFile(path.join(__dirname, '../db/db.json'), notes);

      return res.status(204).send();
    })
    .catch(err => {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Error reading or writing to the database file' });
    });
});

module.exports = notes;