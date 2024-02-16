const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const notesFilePath = path.join(__dirname, 'db', 'db.json');

// Gets all the notes
router.get('/api/notes', (req, res) => {
  fs.readFile(notesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Saves a new note
router.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    res.status(400).json({ error: 'Title and text are required' });
    return;
  }

  fs.readFile(notesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const notes = JSON.parse(data);
    const newNote = {
      id: notes.length + 1,
      title,
      text
    };
    notes.push(newNote);

    fs.writeFile(notesFilePath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(201).json(newNote);
    });
  });
});

// Deletes a note
router.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid note ID' });
    return;
  }

  fs.readFile(notesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const notes = JSON.parse(data);
    const filteredNotes = notes.filter(note => note.id !== id);

    fs.writeFile(notesFilePath, JSON.stringify(filteredNotes), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.sendStatus(204);
    });
  });
});

module.exports = router;