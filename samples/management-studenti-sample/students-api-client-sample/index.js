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
        const newStudent = await addStudent('Ion Popescu', 9.8);
        console.log('Studentul adăugat:', newStudent);

        // Obținem toți studenții
        const allStudents = await getStudents();
        console.log('Toți studenții:', allStudents);

        // Obținem un student după ID
        const studentById = await getStudentById(1);
        console.log('Studentul cu ID-ul 1:', studentById);

        // Actualizăm un student după ID
        const updatedStudent = await updateStudentById(1, 'Ion Popescu', 9.5);
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