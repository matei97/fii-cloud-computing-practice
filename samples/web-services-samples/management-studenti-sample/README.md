## Ghid: Ghid pentru Crearea unui API Local folosind Express.js si crearea unei Aplicații Node.js pentru Conectarea la API-ul Local


În acest ghid, vei învăța cum să creezi o aplicație simplă folosind Node.js compusă dintr-un API și o aplicație web.

### Pasul 1: Configurare a Mediului de Lucru

1. **Instalează Node.js:** Descarcă și instalează Node.js de pe site-ul oficial: [Node.js Download](https://nodejs.org/).

2. **Creare Director de Lucru:** Creează un director nou pentru proiectul tău și navighează în el folosind terminalul sau linia de comandă.

### Pasul 2: Inițializare primului proiect Node.js

1. Deschide terminalul și navighează în directorul proiectului.

2. Rulează următoarea comandă pentru a inițializa un proiect Node.js:

```bash
npm init -y
```
### Pasul 4: Instalare a Dependințelor

1. **Instalare a Pachetului `axios`:** Vom utiliza pachetul `axios` pentru a efectua cereri HTTP către API-ul Random.org. Instalează `axios` folosind următoarea comandă:
```bash
npm install express
```

### Pasul 5: Scrierea Codului

1. Deschide fișierul `index.js` sau creează un fișier nou cu numele `index.js`.

2. În fișierul `index.js`, scrie următorul cod:

```javascript
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

```

## Pasul 6: Rularea Aplicației

1. **Salvăm fișierul `index.js`.**
2. **Deschide terminalul în directorul proiectului și rulează aplicația folosind următoarea comandă:**
```bash
   node index.js
```


## Pasul 7: Crearea unei Aplicații Node.js pentru Conectarea la API-ul Local

**Intr-un folder separat rulati urmatoarele comenzi**
```bash
   npm init -y
   npm install axios
```

### Pasul 8: Scrierea Codului

1. Deschide fișierul `index.js` sau creează un fișier nou cu numele `index.js`.

2. În fișierul `index.js`, scrie următorul cod:

```javascript
// Importă modulul axios
const axios = require('axios');

// URL-ul de bază al API-ului local
const baseURL = 'http://localhost:3000';

// Funcție pentru a obține toți studenții de la API-ul local
async function getStudents() {
    try {
        const response = await axios.get(`${baseURL}/studenti`);
        return response.data;
    } catch (error) {
        console.error('Eroare la obținerea studenților:', error);
        throw error;
    }
}

// Funcție pentru a adăuga un student nou
async function addStudent(nume, nota) {
    try {
        const response = await axios.post(`${baseURL}/studenti`, { nume, nota });
        return response.data;
    } catch (error) {
        console.error('Eroare la adăugarea studentului:', error);
        throw error;
    }
}

// Funcție pentru a obține un student după ID
async function getStudentById(id) {
    try {
        const response = await axios.get(`${baseURL}/studenti/${id}`);
        return response.data;
    } catch (error) {
        console.error('Eroare la obținerea studentului:', error);
        throw error;
    }
}

// Funcție pentru a actualiza un student după ID
async function updateStudentById(id, nume, nota) {
    try {
        const response = await axios.put(`${baseURL}/studenti/${id}`, { nume, nota });
        return response.data;
    } catch (error) {
        console.error('Eroare la actualizarea studentului:', error);
        throw error;
    }
}

// Funcție pentru a șterge un student după ID
async function deleteStudentById(id) {
    try {
        const response = await axios.delete(`${baseURL}/studenti/${id}`);
        return response.data;
    } catch (error) {
        console.error('Eroare la ștergerea studentului:', error);
        throw error;
    }
}

// Exemplu de utilizare a funcțiilor definite mai sus
async function main() {
    try {
        // Adăugăm un student nou
        const newStudent = await addStudent('John Doe', 9.8);
        console.log('Studentul adăugat:', newStudent);

        // Obținem toți studenții
        const allStudents = await getStudents();
        console.log('Toți studenții:', allStudents);

        // Obținem un student după ID
        const studentById = await getStudentById(1);
        console.log('Studentul cu ID-ul 1:', studentById);

        // Actualizăm un student după ID
        const updatedStudent = await updateStudentById(1, 'Jane Doe', 9.5);
        console.log('Studentul actualizat:', updatedStudent);

        // Ștergem un student după ID
        const deletedStudent = await deleteStudentById(1);
        console.log('Studentul șters:', deletedStudent);

        // Obținem toți studenții după ștergere
        const remainingStudents = await getStudents();
        console.log('Studenții rămași:', remainingStudents);
    } catch (error) {
        console.error('Eroare:', error);
    }
}

// Apelăm funcția main pentru a începe execuția aplicației
main();
```

## Pasul 9: Rularea Aplicației

**Rulează aplicația folosind comanda:**
```bash
   node index.js
```



## EN Guide: Guide to Creating a Local API using Express.js and creating a Node.js Application to Connect to the Local API


In this guide, you will learn how to create a simple application using Node.js composed of an API and a web application.

### Step 1: Configuring the Work Environment

1. **Install Node.js:** Download and install Node.js from the official site: [Node.js Download](https://nodejs.org/).

2. **Create Working Directory:** Create a new directory for your project and navigate to it using the terminal or command line.

### Step 2: Initialize your first Node.js project

1. Open the terminal and navigate to the project directory.

2. Run the following command to initialize a Node.js project:

```bash
npm init -y
```
### Step 4: Install Dependencies

1. **Installing the `axios' Package:** We will use the `axios' package to make HTTP requests to the Random.org API. Install `axios` using the following command:
```bash
npm install express
```

### Step 5: Writing the Code

1. Open the file `index.js` or create a new file named `index.js`.

2. In the `index.js` file, write the following code:


```javascript
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

```


## Step 6: Running the Application

1. **Save the `index.js` file.**
2. **Open the terminal in the project directory and run the application using the following command:**
```bash
   node index.js
```


## Step 7: Create a Node.js Application to Connect to the Local API

**In a separate folder run the following commands**
```bash
   npm init -y
   npm install axios
```

### Step 8: Writing the Code

1. Open the file `index.js` or create a new file named `index.js`.

2. In the `index.js` file, write the following code:


```javascript
// Importă modulul axios
const axios = require('axios');

// URL-ul de bază al API-ului local
const baseURL = 'http://localhost:3000';

// Funcție pentru a obține toți studenții de la API-ul local
async function getStudents() {
    try {
        const response = await axios.get(`${baseURL}/studenti`);
        return response.data;
    } catch (error) {
        console.error('Eroare la obținerea studenților:', error);
        throw error;
    }
}

// Funcție pentru a adăuga un student nou
async function addStudent(nume, nota) {
    try {
        const response = await axios.post(`${baseURL}/studenti`, { nume, nota });
        return response.data;
    } catch (error) {
        console.error('Eroare la adăugarea studentului:', error);
        throw error;
    }
}

// Funcție pentru a obține un student după ID
async function getStudentById(id) {
    try {
        const response = await axios.get(`${baseURL}/studenti/${id}`);
        return response.data;
    } catch (error) {
        console.error('Eroare la obținerea studentului:', error);
        throw error;
    }
}

// Funcție pentru a actualiza un student după ID
async function updateStudentById(id, nume, nota) {
    try {
        const response = await axios.put(`${baseURL}/studenti/${id}`, { nume, nota });
        return response.data;
    } catch (error) {
        console.error('Eroare la actualizarea studentului:', error);
        throw error;
    }
}

// Funcție pentru a șterge un student după ID
async function deleteStudentById(id) {
    try {
        const response = await axios.delete(`${baseURL}/studenti/${id}`);
        return response.data;
    } catch (error) {
        console.error('Eroare la ștergerea studentului:', error);
        throw error;
    }
}

// Exemplu de utilizare a funcțiilor definite mai sus
async function main() {
    try {
        // Adăugăm un student nou
        const newStudent = await addStudent('John Doe', 9.8);
        console.log('Studentul adăugat:', newStudent);

        // Obținem toți studenții
        const allStudents = await getStudents();
        console.log('Toți studenții:', allStudents);

        // Obținem un student după ID
        const studentById = await getStudentById(1);
        console.log('Studentul cu ID-ul 1:', studentById);

        // Actualizăm un student după ID
        const updatedStudent = await updateStudentById(1, 'Jane Doe', 9.5);
        console.log('Studentul actualizat:', updatedStudent);

        // Ștergem un student după ID
        const deletedStudent = await deleteStudentById(1);
        console.log('Studentul șters:', deletedStudent);

        // Obținem toți studenții după ștergere
        const remainingStudents = await getStudents();
        console.log('Studenții rămași:', remainingStudents);
    } catch (error) {
        console.error('Eroare:', error);
    }
}

// Apelăm funcția main pentru a începe execuția aplicației
main();
```

## Step 9: Running the Application

**Run the application using the command:**
```bash
   node index.js
```