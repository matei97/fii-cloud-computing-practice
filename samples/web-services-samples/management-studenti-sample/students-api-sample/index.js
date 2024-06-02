// Importă modulul express
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware pentru a permite folosirea JSON în cererile HTTP
app.use(express.json());

// Date de exemplu pentru studenti (initial vid)
let studenti = [];

// Ruta pentru afișarea tuturor studentilor
app.get('/studenti', (req, res) => {
    res.json(studenti);
});

// Ruta pentru adăugarea unui student nou
app.post('/studenti', (req, res) => {
    const { nume, nota } = req.body;
    const studentNou = { id: studenti.length + 1, nume, nota };
    studenti.push(studentNou);
    res.status(201).json(studentNou);
});

// Ruta pentru afișarea unui student după ID
app.get('/studenti/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = studenti.find(student => student.id === id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).send('Studentul nu a fost găsit.');
    }
});

// Ruta pentru actualizarea unui student existent
app.put('/studenti/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nume, nota } = req.body;
    const studentIndex = studenti.findIndex(student => student.id === id);
    if (studentIndex !== -1) {
        studenti[studentIndex] = { id, nume, nota };
        res.json(studenti[studentIndex]);
    } else {
        res.status(404).send('Studentul nu a fost găsit.');
    }
});

// Ruta pentru ștergerea unui student existent
app.delete('/studenti/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const studentIndex = studenti.findIndex(student => student.id === id);
    if (studentIndex !== -1) {
        studenti.splice(studentIndex, 1);
        res.send('Studentul a fost șters cu succes.');
    } else {
        res.status(404).send('Studentul nu a fost găsit.');
    }
});

// Pornirea serverului
app.listen(PORT, () => {
    console.log(`Serverul rulează la adresa http://localhost:${PORT}`);
});
