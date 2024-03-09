// Requires the Express framework
const express = require('express');

// Imports the modular router for handling notes-related routes
const notesRouter = require('./notes');

// Creates an instance of the Express router
const api = express.Router();

// Mounts the notes router under the '/notes' path
api.use('/notes', notesRouter);

// Exports the API router for use in other modules
module.exports = api;