const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Servește fișierul index.html
app.use(express.static(path.join(__dirname)));

app.get('/config.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.send(`const API_URL = '${process.env.API_URL}';`);
});

app.listen(port, () => {
    console.log(`Serverul rulează la http://localhost:${port}`);
});


