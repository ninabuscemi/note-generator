// Importing the Express framework
const express = require('express');

// Importing the modular router for managing notes-related routes
const notesRouter = require('./notes');

// Creating an instance of the Express router
const api = express.Router();

// Mounting the notes router under the '/notes' path
api.use('/notes', notesRouter);

// Exporting the API router to enable its use in other modules
module.exports = api;
