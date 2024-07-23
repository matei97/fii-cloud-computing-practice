## Tutorial: Crearea unei Aplicații Web pe Google App Engine cu Google Cloud Pub/Sub și Funcții Cloud

Scenariu: Gestionarea Cererilor de Suport Tehnic

Vom crea o aplicație web simplă găzduită pe Google App Engine care permite utilizatorilor să trimită cereri de suport tehnic. Cererile de suport vor fi publicate într-un topic Pub/Sub. Vom avea două funcții Cloud care vor fi declanșate de mesajele din Pub/Sub:

1. Funcția 1: Va trimite un email către echipa de suport cu detaliile cererii.
2. Funcția 2: Va salva cererea într-o bază de date Firestore pentru urmărire și management ulterior.


**Flow-ul Aplicației**

1. Utilizatorul trimite o cerere de suport: Utilizatorul completează un formular web pentru a trimite o cerere de suport tehnic.
2. Publicarea mesajului în Pub/Sub: Cererea este publicată într-un topic Pub/Sub.
3. Funcția 1 trimite un email: Prima funcție Cloud este declanșată și trimite un email către echipa de suport cu detaliile cererii.
4. Funcția 2 salvează cererea în Firestore: A doua funcție Cloud este declanșată și salvează cererea într-o bază de date Firestore pentru urmărire ulterioară.

### Pasul 1: Crearea Proiectului și Configurarea Setărilor Folosind Cloud Shell

1. Deschide [Google Cloud Console](https://console.cloud.google.com/) într-un browser web.

2. În partea de sus dreapta a ecranului, apasă pe butonul "Activate Cloud Shell" pentru a deschide Cloud Shell.


3. Executati urmatoarea comanda pentru a configura variabilele de mediu si crearea resurselor:
```bash
export projectName=aplicatie-management
export svcAccount=gestionare-suport-svc
export topicName=suport-topic
export subscription1=email-subscription
export subscription2=firestore-subscription

gcloud config set project $projectName
gcloud projects create $projectName --name="Gestionare Suport"
gcloud config set project $projectName
gcloud pubsub topics create $topicName
gcloud pubsub subscriptions create $subscription1 --topic $topicName
gcloud pubsub subscriptions create $subscription2 --topic $topicName

```
4. Creează un nou service account cu numele "management-studenti-svc" folosind comanda:

```bash
gcloud iam service-accounts create $svcAccount --display-name "Service Account pentru Gestionare Suport"
```

5. Asignează rolurile necesare service account-ului:

```bash
gcloud projects add-iam-policy-binding $projectName \
--member=serviceAccount:$svcAccount@$projectName.iam.gserviceaccount.com \
--role=roles/pubsub.publisher

gcloud projects add-iam-policy-binding $projectName \
--member=serviceAccount:$svcAccount@$projectName.iam.gserviceaccount.com \
--role=roles/pubsub.subscriber

gcloud projects add-iam-policy-binding $projectName \
--member=serviceAccount:$svcAccount@$projectName.iam.gserviceaccount.com \
--role=roles/datastore.user

gcloud projects add-iam-policy-binding $projectName \
--member=serviceAccount:$svcAccount@$projectName.iam.gserviceaccount.com \
--role=roles/appengine.appAdmin
```
