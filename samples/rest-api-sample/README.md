# Prezentare
[Link to Google Presentation](https://docs.google.com/presentation/d/1c3-0Ge87Q36gR4aBms_vrdKEe-YR57iW8jc4iAu47Pg/edit?usp=sharing)

## Practice session - API pentru Gestionarea unei Biblioteci
### Configurația inițială a proiectului

1. **Configurația inițială a proiectului**:
    - Inițializează un proiect Node.js.
    - Instalează pachetele necesare: `express`, `mysql2`, `body-parser`, `jsonwebtoken`.
    - Creează fișierele de bază ale proiectului, cum ar fi `app.js` și `config/db.js`.

2. **Setarea serverului Express**:
    - Importă și configurează Express în `app.js`.
    - Adaugă un endpoint de test pentru a verifica dacă serverul pornește corect.

3. **Conectarea la baza de date MySQL**:
    - Creează un fișier pentru configurarea conexiunii la baza de date (`config/db.js`).
    - Configurează conexiunea la baza de date MySQL.
    - Testează conexiunea la baza de date în `app.js`.

4. **Crearea tabelelor MySQL**:
    - Creează o bază de date numită `library`.
    - Creează tabelul `Books` cu următoarea structură: `id`, `title`, `author`, `published_year`, `genre`.
    - Creează tabelul `Users` cu următoarea structură: `id`, `username`, `password`, `first_name`, `last_name`, `email`.
    - Asigură-te că tabelul este creat corect prin verificarea în baza de date.

## Operațiuni CRUD

5. **Crearea unui endpoint POST pentru a adăuga o carte**:
    - Creează un endpoint `POST /api/books` pentru a adăuga o carte nouă în tabelul `Books`.
    - Validează datele primite în request body (asigură-te că toate câmpurile necesare sunt prezente).
    - Inserează datele valide în baza de date.

6. **Crearea unui endpoint GET pentru a lista toate cărțile**:
    - Creează un endpoint `GET /api/books` pentru a returna toate cărțile din baza de date.
    - Asigură-te că datele sunt returnate în format JSON.

7. **Crearea unui endpoint GET pentru a obține o carte specifică**:
    - Creează un endpoint `GET /api/books/:id` pentru a returna o carte specifică pe baza ID-ului primit în path parameter.
    - Validează ID-ul primit și returnează datele corespunzătoare din baza de date.

8. **Crearea unui endpoint PUT pentru a actualiza informațiile unei cărți**:
    - Creează un endpoint `PUT /api/books/:id` pentru a actualiza informațiile unei cărți.
    - Permite actualizarea doar a câmpurilor care sunt trimise în request body.
    - Asigură-te că datele actualizate sunt salvate în baza de date.

9. **Crearea unui endpoint DELETE pentru a șterge o carte**:
    - Creează un endpoint `DELETE /api/books/:id` pentru a șterge o carte pe baza ID-ului primit în path parameter.
    - Validează ID-ul și șterge înregistrarea corespunzătoare din baza de date.

## Funcționalități avansate

10. **Utilizarea query parameters pentru filtrare**:
    - Modifică endpoint-ul `GET /api/books` pentru a permite filtrarea cărților pe baza genului (`genre`) și anului de publicare (`published_year`) folosind query parameters.
    - Implementează logica de filtrare în query-ul către baza de date.

11. **Adăugarea autentificării JWT**:
    - Creează un endpoint `POST /api/auth/login` care primește un `username` și `password` și returnează un token JWT.
    - Implementează middleware pentru verificarea JWT și aplică-l pe toate endpoint-urile pentru gestionarea cărților.
    - Asigură-te că token-ul JWT este generat și verificat corect.

12. **Protejarea endpoint-urilor cu middleware JWT**:
    - Asigură-te că toate operațiunile CRUD asupra cărților necesită un token JWT valid pentru a fi accesate.
    - Adaugă middleware-ul de verificare JWT la toate endpoint-urile relevante.

## Validare

13. **Validarea datelor și gestionarea erorilor**:
    - Adaugă validări pentru toate endpoint-urile pentru a te asigura că datele primite sunt corecte.
    - Adaugă middleware pentru gestionarea erorilor și returnarea unor mesaje de eroare semnificative către client.
    - Asigură-te că erorile sunt tratate corect și utilizatorii primesc mesaje adecvate.