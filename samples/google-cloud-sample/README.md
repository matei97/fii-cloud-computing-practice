## Ghid: Crearea unei Aplicații folosind GCP (Google Cloud Provider)

În acest ghid, vom învăța cum să creăm o aplicație simplă Node.js care accesează un API extern pentru a genera numere aleatorii. Vom utiliza API-ul Random.org pentru acest exemplu.

### Pasul 1: Crearea Proiectului și Configurarea Setărilor Folosind Cloud Shell

1. Deschide [Google Cloud Console](https://console.cloud.google.com/) într-un browser web.

2. În partea de sus dreapta a ecranului, apasă pe butonul "Activate Cloud Shell" pentru a deschide Cloud Shell.


3. Executati urmatoarea comanda pentru a configura variabilele de mediu:
```bash
export projectName=aplicatie-management
export svcAccount=management-studenti-svc
export location=europe-west1
export bucket1Name=date-media-utilizator-neprocesate
export bucket2Name=date-media-utilizator-procesate
export databaseName=management-studenti
```
4. În Cloud Shell, asigură-te că ești autentificat cu contul tău Google și că folosești proiectul corect. Poți verifica proiectul actual folosind comanda:

```bash
gcloud config list project
```

Dacă proiectul afișat nu este "AplicatieManagementStudenti" sau proiectul dorit, folosește comanda gcloud config set project pentru a seta proiectul corect:

```bash
gcloud config set project $projectName
```

4. Dacă proiectul "AplicatieManagementStudenti" nu există, poți crea unul nou folosind comanda:

```bash
gcloud projects create $projectName --name="Aplicatie Management Studenti"
```

Această comandă va crea un proiect nou cu numele "AplicatieManagementStudenti". Poți înlocui numele și descrierea proiectului cu ceea ce dorești.

5. După ce proiectul este creat sau selectat, asigură-te că ești în proiectul corect înainte de a continua.
Verifică și activează "Billing Account".

6. **Optiona** Urmareste aceasta [pagina](https://support.terra.bio/hc/en-us/articles/360057589931-How-to-set-up-and-use-Google-Cloud-budget-alerts) pentru a seta un buget proiectului creat.

7. Creează un nou service account cu numele "management-studenti-svc" folosind comanda:

```bash
gcloud iam service-accounts create $svcAccount --display-name "Service Account pentru Managementul Studenților"
```

8. După ce service account-ul este creat, asignează drepturile "Cloud Run Invoker", "Storage Admin", "Vertx AI Administrator" si "Datastore Owner" folosind comanda. 

```bash
gcloud projects add-iam-policy-binding $projectName \
--member=serviceAccount:$svcAccount@$projectName.iam.gserviceaccount.com \
--role=roles/run.invoker

gcloud projects add-iam-policy-binding $projectName \
--member=serviceAccount:$svcAccount@$projectName.iam.gserviceaccount.com \
--role=roles/storage.admin

gcloud projects add-iam-policy-binding $projectName \
--member=serviceAccount:$svcAccount@$projectName.iam.gserviceaccount.com \
--role=roles/aiplatform.admin

gcloud projects add-iam-policy-binding $projectName \
--member=serviceAccount:$svcAccount@$projectName.iam.gserviceaccount.com \
--role=roles/datastore.owner
```
9. Pentru a folosi serviciile Vetex AI este nevoie sa le activam. Navigati catre serviciul Vertex AI si bifam **ENABLE ALL RECOMMENDED APIS**.

10. După ce proiectul este selectat sau creat, poți crea primul bucket, "date-media-utilizator-neprocesate", folosind următoarea comandă:

```bash
gsutil mb -l $location gs://$bucket1Name
```
11. Repetă comanda de mai sus pentru a crea și al doilea bucket, "date-media-utilizator-procesate".

```bash
gsutil mb -l $location gs://$bucket2Name
```

11. Ruleaza comanda pentru a crea o resursa de tip Datastore cu numele "management-studenti". Aici e nevoie de confirmare penptru a activa serviciul - prin tasta y.

```bash
gcloud firestore databases create \
--database=$databaseName \
--location=$location \
--type=datastore-mode 
```

### Pasul 2: Crearea Funcției Cloud și Configurarea Setărilor

1. Navighează la meniul din partea stângă și selectează "Cloud Functions".
2. Apasă pe butonul "+ Create function" pentru a începe procesul de creare a unei funcții Cloud noi.
3. În pagina de configurare a funcției Cloud, completează următoarele detalii:
- Name: Procesare-date-utilizator
- Mediu(Environment) functie: 2nd
- Region: europe-west1
- Trigger: Cloud Storage
- Bucket: date-media-utilizator-neprocesate
- Event Type: Finalize object (google.cloud.storage.object.v1.finalized)
4. În secțiunea "Runtime, build, connections and security settings", asigură-te că setezi "Runtime service account" pe "Service Account pentru Managementul Studentilor" (care a fost creat anterior). Aceasta este opțiunea care va permite funcției Cloud să acceseze resursele Google Cloud folosind service account-ul specificat.
5. Seteaza urmatoarele variabile de mediu (environment variables): 
- PROJECT=aplicatie-management
- DATASTORE_DATABASE_ID=management-studenti
- TARGET_BUCKET_NAME = date-media-utilizator-procesate

5. După ce ai completat toate detaliile și setările necesare, apasă pe butonul "Next" pentru a continua.
6. În secțiunea "Source code", poți încărca codul funcției tale Cloud. Pentru acest exemplu vom folosi codul din ./samples/google-cloud-sample/cloud-functions/image-recognition-translation-sample. Vom folosi aceasta functie pentru a procesa imagini încărcate într-un bucket de Google Storage de către o aplicație web găzduită pe Google App Engine. Când o imagine este încărcată, o funcție Google Cloud este declanșată pentru a prelua imaginea și a o trimite către Vertex AI Vision pentru analiză. Acest serviciu returnează o descriere a imaginii în limba engleză, care este apoi tradusă în română folosind Vertex AI Language. După analiză vom introduce in baza de date descrierea în română și în engleză. Principalul avantaj al acestei abordări este că sarcina intensivă de procesare a imaginii este mutată din aplicația web într-o funcție Google Cloud care rulează asincron, ceea ce înseamnă că utilizatorul nu trebuie să aștepte ca imaginea să fie procesată, îmbunătățind astfel experiența utilizatorului.

In fisierul index.js
```javascript
const functions = require('@google-cloud/functions-framework');
const { Datastore } = require('@google-cloud/datastore');
const {
  VertexAI
} = require('@google-cloud/vertexai');

const location = 'europe-west1';
const visionModel = 'gemini-1.0-pro-vision';
const textModel = 'gemini-1.0-pro-001';
const vertexAI = getGenericVertexAIClient();
const generativeModel = getGenerativeModelTranslateModel();
const generativeVisionModel = getVisionModel();
const datastore = getDatastoreClient();

// Register a CloudEvent callback with the Functions Framework that will
// be triggered by Cloud Storage.
functions.cloudEvent('helloGCS', async (cloudEvent) => {
  console.log(`Event ID: ${cloudEvent.id}`);
  console.log(`Event Type: ${cloudEvent.type}`);

  const file = cloudEvent.data;
  console.log(`Bucket: ${file.bucket}`);
  console.log(`File: ${file.name}`);
  console.log(`Metageneration: ${file.metageneration}`);
  console.log(`Created: ${file.timeCreated}`);
  console.log(`Updated: ${file.updated}`);

  var englishContent = await detectImageContent(file)
  var roContent = await translateContent(englishContent);
  let data = { englishContent: englishContent, roContent: roContent }

  await SaveInDatabase(data, file.name)
});

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


function getGenerativeModelTranslateModel() {
  return vertexAI.preview.getGenerativeModel({
    model: textModel,
    generationConfig: {
      'candidateCount': 1,
      'maxOutputTokens': 4096,
      'topP': 1,
    },
    safetySettings: [
      {
        'category': 'HARM_CATEGORY_HATE_SPEECH',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        'category': 'HARM_CATEGORY_HARASSMENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
      }
    ],
  });
}

function getVisionModel() {
  return vertexAI.getGenerativeModel({
    model: visionModel,
  });
}

function getGenericVertexAIClient() {
  return new VertexAI({ project: process.env.PROJECT, location: location });
}


async function detectImageContent(file) {
  // Replace this with your own base64 image string
  const filePart = { fileData: { fileUri: `gs://${file.bucket}/${file.name}`, mimeType: "image/jpeg" } };
  const textPart = { text: 'What is this picture about?' };
  const request = {
    contents: [{ role: 'user', parts: [textPart, filePart] }],
  };
  const streamingResult = await generativeVisionModel.generateContentStream(request); //todo this shoul
  const contentResponse = await streamingResult.response;

  var enContent = contentResponse.candidates[0].content.parts[0].text;
  console.log('Response: ', enContent);

  return enContent;
}

async function translateContent(content, source = "en", target = "ro") {
  const req = {
    contents: [
      { role: 'user', parts: [{ text: `translate from ${source} to ${target}: ${content}}` }] }
    ]
  };

  const result = await generativeModel.generateContent(req);
  const jsonResponse = JSON.stringify(result.response.candidates[0].content.parts[0].text);
  console.log('Response: ', jsonResponse);

  return jsonResponse;
}

async function SaveInDatabase(data, originalname) {

  const query = datastore.createQuery('users').filter('fileName', '=', originalname);

  const [entities] = await datastore.runQuery(query);

  if (entities.length === 0) {
    console.log('No matching entity found.');
    return;
  }

  const entity = entities[0];
  const key = entity[datastore.KEY];

  entity.enFileContent = data.englishContent;
  entity.roFileContent = data.roContent

  await datastore.save({
    key: key,
    data: entity,
  });
}

function getDatastoreClient() {
  return new Datastore({
    projectId: process.env.PROJECT,
    databaseId: process.env.DATASTORE_DATABASE_ID,
  });
}
```

In fisierul package.json

```javascript
{
  "dependencies": {
    "@google-cloud/functions-framework": "^3.0.0",
    "@google-cloud/storage": "^5.18.2",
    "@google-cloud/datastore": "^8.2.0",
    "@google-cloud/vertexai": "^1.1.0",
        "pdfkit": "^0.13.0",
        "pngjs": "^7.0.0",
        "sharp": "^0.33.3",
        "fs": "^0.0.1-security"
  }
}
  ```

7. După ce ai încărcat codul și ai configurat eventualele setări suplimentare, apasă pe butonul "Deploy" pentru a crea funcția Cloud.

### Pasul 3: Testarea Funcției Cloud (Doar pentru functiile "media-resizer-sample" si "media-to-pdf-conveter-sample". Pentru "image-recognition-translation-sample" nu se aplica). 

1. Navighează la meniul din partea stângă și selectează "Storage" -> "Browser".
2. Identifică bucket-ul "date-media-utilizator-neprocesate-v2" și deschide-l.
3. Apasă pe butonul "Upload files" și selectează un fișier media local pe care dorești să-l încarci.
4. După ce fișierul este încărcat cu succes, așteaptă câteva momente pentru ca funcția să fie declanșată și să proceseze fișierul.
5. După ce procesul este complet, navighează la bucket-ul "date-media-utilizator-procesate-v2" în aceeași pagină "Storage".
6. Verifică dacă fișierul procesat, conform specificațiilor din funcția Cloud, este prezent în acest bucket.
7. Dacă fișierul procesat este prezent și este conform așteptărilor, funcția Cloud a fost testată cu succes.

### Pasul 4: Deploy-ul unei Aplicații Node.js folosind Google App Engine

1. Asigură-te că ești autentificat în Cloud Shell (dreapta sus) și că ești în directorul proiectului tău Node.js.

2. Ruleaza urmatoarele comenzi

```bash
git clone https://github.com/matei97/fii-cloud-computing-practice

cd fii-cloud-computing-practice/samples/google-cloud-sample/app-engine
```
3. Vizualizati fisierele

```bash
cat app.yaml
```
Acesta conține informații despre cum să fie configurată și rulată aplicația ta atunci când este desfășurată pe platforma Google App Engine. Iată o scurtă explicație a fiecărei secțiuni din fișierul app.yaml:

- runtime: Această secțiune specifică mediu de rulare pentru aplicația ta. În cazul tău, runtime: nodejs18 indică faptul că aplicația ta va rula pe mediul Node.js versiunea 18.
- service: Această secțiune specifică numele serviciului de App Engine. Acest nume este folosit pentru a identifica și gestiona serviciul tău în cadrul platformei Google Cloud.
- service_account: Aici specifici service account-ul care va fi folosit pentru a accesa resursele Google Cloud din cadrul aplicației tale. Acest service account este asociat cu rolurile și permisiunile necesare pentru a face operațiunile dorite în cloud.
- env_variables: Această secțiune permite definirea variabilelor de mediu care sunt disponibile în timpul rulării aplicației tale pe Google App Engine. În cazul tău, variabila GCLOUD_STORAGE_BUCKET este definită pentru a specifica bucket-ul Google Cloud Storage în care se vor încărca datele utilizatorului.

**Verificați faptul că variabilele din fișierul app.yaml coincid cu configurația proiectului**.

```bash
cat index.html
```

Acest fisier contine un formular pentru înregistrarea utilizatorilor și pentru încărcarea unei fotografii de profil. Iată o explicație detaliată a fiecărei secțiuni a fișierului:

```bash
cat app.js
```

Acesta este un fișier JavaScript care definește o aplicație Node.js care utilizează Google Cloud Storage pentru a încărca fișiere și Google Cloud Datastore pentru a salva datele utilizatorilor.

4. Rulează urmatoarea comanda pentru a încărca și a desfășura aplicația pe Google App Engine. Acest lucru va începe procesul de deploy și va crea o nouă versiune a aplicației tale.


```bash
gcloud app deploy
```
Numărul **11** corespunde locației europe-west.

5. Urmează instrucțiunile afișate în Cloud Shell pentru a confirma și a finaliza deploy-ul aplicației.

6. Pentru a afla URL-ul aplicației "default" de pe Google App Engine, poți folosi comanda gcloud app browse, astfel:

```bash
gcloud app browse
```

7. Dacă totul a mers cu success, după completarea formularului ar trebui să vedeți detaliile in baza de date Datastore (management-studenti). **enFileContent** va fi populat cu descrierea imaginii provenite din serviciul Vertex AI iar **roFileContent** va fi populat cu traducerea acesteia.