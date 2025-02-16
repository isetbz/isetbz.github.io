// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
    const { cin, inscription } = req.body;
    // Here you can process the form data
    console.log('Form data:', { cin, inscription });
    res.json({ message: 'Form submitted successfully!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});