## Cerință pentru Exercițiu: Orchestarea Apelurilor către API-uri Diferite

Dorim să creăm o aplicație Node.js care să efectueze apeluri către două API-uri diferite într-o manieră orchestrată. Apelurile către API-uri vor fi făcute secvențial, astfel vom afisa un raspuns compus format din ambele raspunsuri.

### Cerințe

1. Implementează o aplicație Node.js care să efectueze apeluri către două API-uri diferite. Apelurile trebuie să fie realizate secvențial, astfel încât răspunsul de la primul API să fie utilizat în cererea către al doilea API.
2. Selectează două API-uri publice care să ofere diferite tipuri de date sau servicii. Aceste API-uri trebuie să fie disponibile pentru accesare gratuită și să permită cereri HTTP.
3. În momentul implementării, asigură-te că gestionezi erorile corespunzător și afișezi un mesaj adecvat în cazul în care un apel către un API eșuează.
4. Creaza un repository pe GitHub unde vei salva codul sursa.

### Exemple de API-uri

Puteți folosi urmatoarele API-uri sau cauta altele [aici](https://rapidapi.com/collection/list-of-free-apis)

1. API 1: OpenWeatherMap
- URL: http://api.openweathermap.org/data/2.5/weather
- Descriere: API-ul OpenWeatherMap oferă informații meteorologice pentru diferite localități din întreaga lume. Poți efectua cereri pentru a obține date despre vremea curentă, previziuni pe termen scurt și pe termen lung.


1. API 2: REST Countries
- URL: https://restcountries.com/v3.1/name/
- Descriere: API-ul REST Countries furnizează informații despre țările din întreaga lume. Poți efectua cereri pentru a obține detalii precum denumirea, steagul, populația și altele despre o anumită țară.



## EN - Exercise Requirement: Orchestrating Calls to Different APIs

We want to create a Node.js application that makes calls to two different APIs in an orchestrated manner. The calls to the APIs will be made sequentially, so we will display a composite response consisting of both responses.

### Requirements

1. Implement a Node.js application to make calls to two different APIs. The calls must be made sequentially so that the response from the first API is used in the request to the second API.
2. Select two public APIs that provide different types of data or services. These APIs must be freely accessible and allow HTTP requests.
3. At implementation time, make sure you handle errors properly and display an appropriate message if a call to an API fails.
4. Create a repository on GitHub where you will save the source code.

### Examples of APIs

You can use the following APIs or search for others [here](https://rapidapi.com/collection/list-of-free-apis)

1. API 1: OpenWeatherMap
- URL: http://api.openweathermap.org/data/2.5/weather
- Description: The OpenWeatherMap API provides weather information for different localities around the world. You can make requests to get current weather data, short-term and long-term forecasts.


1. API 2: REST Countries
- URL: https://restcountries.com/v3.1/name/
- Description: The Countries REST API provides information about countries around the world. You can make requests to get details like name, flag, population and more about a particular country.