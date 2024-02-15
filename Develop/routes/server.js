const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.post('/api/notes', (req, res) => {
    const newNote = req.body; // Get the note data from the request body
    // Add code to store the note data in db.json
    // Add code to assign a unique ID to the note
    // Return the saved note with the unique ID
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});