## Cerință pentru Exercițiu: Orchestarea Apelurilor către API-uri Diferite

Dorim să creăm o aplicație Node.js care să efectueze apeluri către două API-uri diferite într-o manieră orchestrată. Apelurile către API-uri vor fi făcute secvențial, astfel vom afisa un raspuns compus format din ambele raspunsuri.


### Cerințe

1. Implementează o aplicație Node.js care să efectueze apeluri către două API-uri diferite. Apelurile trebuie să fie realizate secvențial, astfel încât răspunsul de la primul API să fie utilizat în cererea către al doilea API.
2. Selectează două API-uri publice care să ofere diferite tipuri de date sau servicii. Aceste API-uri trebuie să fie disponibile pentru accesare gratuită și să permită cereri HTTP.
3. În momentul implementării, asigură-te că gestionezi erorile corespunzător și afișezi un mesaj adecvat în cazul în care un apel către un API eșuează.
4. Creaza un repository pe GitHub unde vei salva codul sursa.

### Exemple de API-uri

Puteți folosi urmatoarele API-uri sau cauta altele [aici] (https://rapidapi.com/collection/list-of-free-apis)

1. API 1: OpenWeatherMap
- URL: http://api.openweathermap.org/data/2.5/weather
- Descriere: API-ul OpenWeatherMap oferă informații meteorologice pentru diferite localități din întreaga lume. Poți efectua cereri pentru a obține date despre vremea curentă, previziuni pe termen scurt și pe termen lung.


1. API 2: REST Countries
- URL: https://restcountries.com/v3.1/name/
- Descriere: API-ul REST Countries furnizează informații despre țările din întreaga lume. Poți efectua cereri pentru a obține detalii precum denumirea, steagul, populația și altele despre o anumită țară.