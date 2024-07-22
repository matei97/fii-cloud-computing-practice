const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// Configurația conexiunii la baza de date
const config = {
    user: '',
    password: '',
    server: '',
    database: '',
    options: {
        encrypt: true
    }
};

const corsOptions = {
    origin: 'http://localhost:3001', // Originea permisă
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());


// Endpoint care returnează date din baza de date
app.get('/api/data', async (req, res) => {
    console.log(`GET Request`);

    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM TabelaMea');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Endpoint pentru a adăuga date în baza de date
app.post('/api/data', async (req, res) => {
    console.log(`POST Request` + req.body);
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Name', sql.NVarChar, req.body.Name)
            .input('Value', sql.NVarChar, req.body.Value)
            .query('INSERT INTO TabelaMea (Name, Value) VALUES (@Name, @Value)');
        res.status(201).send('Date adăugate');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`API-ul rulează la http://localhost:${port}`);
});