const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    // Read existing notes from db.json
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));

    // Assign a unique ID to the new note
    newNote.id = uuidv4();

    // Add the new note to the existing notes
    notes.push(newNote);

    // Save the updated notes back to db.json
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes, null, 2));

    // Return the saved note with the unique ID
    res.json(newNote);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});