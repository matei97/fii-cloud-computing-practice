## Practică pe cont propriu: Construirea unei Aplicații Web cu API și Bază de Date SQL
În această secțiune de practică, veți construi o aplicație mică care include un front-end web, un back-end API și o bază de date SQL. Scopul este să înțelegeți cum să integrați diferite componente și să le implementați în Azure.

**Exercițiul 1: Configurarea Mediului**
Obiectiv: Configurați resursele necesare în Azure pentru a găzdui o aplicație web, un API și o bază de date SQL.

Puncte de Pornire:

1. Creați un grup de resurse în Azure.
2. Creați un Plan de Servicii App.
3. Creați o Aplicație Web pentru front-end.
4. Creați o altă Aplicație Web pentru API.
5. Creați o Bază de Date SQL Azure.

```bash
#!/bin/bash
RANDOM_STRING=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 4 | head -n 1)
# Prefix for the resource group name
PREFIX="rg"
export location="westeurope"
export appServicePlan="plan-aplicatie-practica-$RANDOM_STRING"
export appServiceBackend="service-aplicatie-practica-be-$RANDOM_STRING"
export appServiceFrontEnd="service-aplicatie-practica-fe-$RANDOM_STRING"
export sqlServer="server-practica-$RANDOM_STRING"
export dbName="db-practica-$RANDOM_STRING"
export dbUser="my-admin"
export dbPassword="parolaMea123!"

# Get the currently logged in Azure username
AZURE_USER=$(az ad signed-in-user show --query userPrincipalName -o tsv | cut -d'@' -f1)

# Generate the resource group name
GROUP_NAME="${PREFIX}-${AZURE_USER}"

# Set the resource group name in an environment variable
export resourceGroup=$GROUP_NAME

# Pasul 1: Creați un grup de resurse
az group create --name $resourceGroup --location $location

# Pasul 2: Creați un Plan de Servicii App
az appservice plan create --name $appServicePlan --resource-group $resourceGroup --location $location --sku B1 --is-linux

# Pasul 3: Creați o Aplicație Web pentru front-end
az webapp create --name $appServiceFrontEnd --resource-group $resourceGroup --plan $appServicePlan --runtime "NODE:20-lts"

# Pasul 4: Creați o Aplicație Web pentru API
az webapp create --name $appServiceBackend --resource-group $resourceGroup --plan $appServicePlan --runtime "NODE:20-lts"

# Pasul 5: Creați o Bază de Date SQL Azure
az sql server create --name $sqlServer --resource-group $resourceGroup --location $location --admin-user $dbUser --admin-password $dbPassword

az sql db create --resource-group $resourceGroup --server $sqlServer --name $dbName --service-objective S0
```



**Exercițiul 2: Dezvoltarea Front-End-ului**

Obiectiv: Creați o pagină web simplă care interacționează cu API-ul.

Puncte de Pornire:

1. Inițializați un nou proiect Node.js pentru front-end.
2. Creați o pagină HTML simplă.

Pași:

1. Creați un nou director pentru proiectul front-end.
2. Inițializați un proiect Node.js și instalați pachetele necesare.
3. Creați un fișier index.html.

```bash
# Creați un nou director pentru proiectul front-end și accesați-l
mkdir proiectulMeuFrontEnd
cd proiectulMeuFrontEnd

# Inițializați un nou proiect Node.js
npm init -y

# Instalați pachetele necesare (de exemplu, Express pentru un server simplu)
npm install express

# Creați un fișier index.html în directorul rădăcină al proiectului
touch index.html
```

Exemplu de conținut pentru index.html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplicația Mea</title>
</head>
<body>
    <h1>Bine ați venit la Aplicația Mea!</h1>
    <p>Aceasta este o aplicație web simplă.</p>
    <button onclick="fetchData()">Afișează date</button>
    <div id="data"></div>

    <script>
        function fetchData() {
            fetch('/api/data')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('data').innerText = JSON.stringify(data);
                });
        }
    </script>
</body>
</html>

```



**Exercițiul 3: Dezvoltarea API-ului**


Obiectiv: Creați un API simplu care returnează date din baza de date SQL.

Puncte de Pornire:

1. Inițializați un nou proiect Node.js pentru API.
2. Creați un endpoint care returnează date din baza de date SQL.

Pași:

1. Creați un nou director pentru proiectul API.
2. Inițializați un proiect Node.js și instalați pachetele necesare.
3. Configurați conexiunea la baza de date SQL Azure.

```bash
# Creați un nou director pentru proiectul API și accesați-l
mkdir proiectulMeuAPI
cd proiectulMeuAPI

# Inițializați un nou proiect Node.js
npm init -y

# Instalați pachetele necesare (de exemplu, Express și mssql pentru conectarea la SQL)
npm install express mssql

# Creați un fișier index.js în directorul rădăcină al proiectului
touch index.js

```

Exemplu de conținut pentru index.js:

```javascript
const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

// Configurația conexiunii la baza de date
const config = {
    user: 'adminulMeu',
    password: 'parolaMea123!',
    server: 'serverulMeuSql.database.windows.net',
    database: 'bazaMeaDeDate',
    options: {
        encrypt: true
    }
};

// Endpoint care returnează date din baza de date
app.get('/api/data', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM TabelaMea');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`API-ul rulează la http://localhost:${port}`);
});
```

**Exercițiul 4: Integrarea și Implementarea Aplicației**

Obiectiv: Integrați front-end-ul cu API-ul și implementați aplicațiile în Azure.

Puncte de Pornire:

1. Configurați implementarea continuă pentru ambele aplicații folosind GitHub Actions.
2. Implementați aplicațiile în App Service.

Pași:

1. Configurați un repository GitHub pentru fiecare aplicație (front-end și API).
2. Configurați GitHub Actions pentru implementarea continuă.
3. Implementați aplicațiile în Azure App Service.



**Gestionarea Produselor și Categoriilor**
Scenariu:
Extindeți aplicația existentă pentru a gestiona produse și categorii. Fiecare produs trebuie să aparțină unei categorii, iar o categorie poate avea mai multe produse. Veți modifica baza de date, API-ul și front-end-ul pentru a permite utilizatorilor să adauge, să vizualizeze și să gestioneze produse și categorii.

1. Baza de Date:

- Creați un tabel Categories cu coloanele CategoryId (cheie primară) și CategoryName.
- Creați un tabel Products cu coloanele ProductId (cheie primară), ProductName, Price și CategoryId (cheie externă legată de CategoryId din Categories).

2. API:

- Adăugați endpoint-uri pentru a gestiona categoriile (GET, POST, PUT, DELETE).
- Adăugați endpoint-uri pentru a gestiona produsele (GET, POST, PUT, DELETE).
- Asigurați-vă că endpoint-urile pentru produse permit filtrarea după categorie.

3. Front-End:

- Modificați interfața pentru a permite utilizatorilor să vizualizeze și să adauge categorii.
- Modificați interfața pentru a permite utilizatorilor să vizualizeze și să adauge produse, selectând categoria dintr-o listă derulantă.
- Asigurați-vă că lista de produse poate fi filtrată după categorie.


**Pasul 5: Ștergerea Resurselor**

```bash
az group delete --name $resourceGroup
```
