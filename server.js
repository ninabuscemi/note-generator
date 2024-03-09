// Including essential modules and dependencies
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/index.js'); // Importing routes for the API
const app = express(); // Creating an instance of the express application

const PORT = process.env.PORT || 3001; // Specifying the server port



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting up routes for API requests
app.use('/api', apiRoutes);

// Serving static files from the 'public' directory
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to redirect users to index.html if route not found
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Starting the server and listening on the specified port
app.listen(PORT, () =>
    console.log(`Server is running and listening at http://localhost:${PORT}`)
);
