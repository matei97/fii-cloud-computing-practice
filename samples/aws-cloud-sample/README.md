# Prezentare
[Link to Google Presentation](https://docs.google.com/presentation/d/1Zl-cvp1DWdQ9GBD40REm5xZu0veYUydUBi0mqkiSO_M/edit?usp=sharing)

# Practice session: Sistem de gestionare și analiză a imaginilor în cloud folosind AWS și Node.js

## Introducere
În această temă, veți crea un sistem de gestionare a imaginilor în cloud utilizând AWS și Node.js. Veți folosi diverse servicii AWS, cum ar fi S3, IAM, RDS, Lambda, SNS și Rekognition pentru a dezvolta o aplicație complet funcțională. Tema este structurată pentru a putea fi finalizată în 2-3 ore.

## Cerințe

### 1. Configurarea mediului de lucru
- **Configurați mediul AWS:**
    - Accesați consola AWS și navigați la serviciul IAM.
    - Creați un nou utilizator IAM. Atribuiți-i permisiuni pentru accesul la S3, RDS, Lambda, SNS și Rekognition. Puteți face acest lucru atașând politicile gestionate predefinite relevante pentru fiecare serviciu.
    - Generați și salvați cheile de acces (Access Key ID și Secret Access Key) pentru acest utilizator.

- **Configurați mediul Node.js:**
    - Asigurați-vă că aveți Node.js și npm instalate pe mașina dvs. locală.
    - Inițializați un proiect Node.js folosind `npm init`.
    - Instalați AWS SDK cu `npm install aws-sdk`.
    - Configurați AWS CLI pe mașina dvs. locală și rulați `aws configure` pentru a introduce secretele generate anterior.

### 2. Stocarea și gestionarea imaginilor în S3
- **Creați un bucket S3:**
    - Accesați consola AWS și navigați la S3.
    - Creați un nou bucket, denumiți-l `fii-cloud-image-store`.
    - Configurați bucket-ul să fie privat. Sub secțiunea de permisiuni, dezactivați accesul public.
    - Adăugați o politică de bucket pentru a permite utilizatorului IAM să încarce și să descarce obiecte în acest bucket.

- **Implementați funcționalitatea de încărcare a imaginilor:**
    - Creați un endpoint API în aplicația dvs. Node.js folosind Express.js (aveți exemple de la REST API).
    - Utilizați AWS SDK pentru a implementa funcționalitatea de încărcare a fișierelor. Veți citi fișierul de pe sistemul de fișiere local și îl veți încărca în bucket-ul S3 specificat.
    - Asigurați-vă că gestionați tipurile de conținut și mărimea fișierelor încărcate pentru a evita problemele de performanță și securitate.

### 3. Stocarea metadatelor imaginilor în RDS
- **Configurați o bază de date RDS:**
    - Accesați consola AWS și navigați la RDS.
    - Lansați o nouă instanță de bază de date (alegeți MySQL sau PostgreSQL).
    - Configurați parametrii instanței, cum ar fi dimensiunea și clasa, pentru a se potrivi nevoilor proiectului (adică variantele free trial).
    - Configurați setările de securitate pentru a permite accesul public.

- **Crearea tabelelor în baza de date:**
    - Conectați-vă la baza de date utilizând un client SQL (cum ar fi MySQL Workbench pentru MySQL).
    - Creați un tabel pentru a stoca detalii despre imagini. De exemplu:
        - `image_id` - UUID sau AUTO_INCREMENT
        - `image_name` - VARCHAR(255)
        - `upload_date` - TIMESTAMP
        - `s3_url` - VARCHAR(255)
    - Creați un tabel pentru a stoca metadatele imaginilor. De exemplu:
      - `image_id` - UUID sau INT, legat de `image_id` din tabelul de imagini
      - `label` - VARCHAR(255)
      - `confidence` - FLOAT
      - `timestamp` - TIMESTAMP

- **Implementați funcționalitatea de stocare a metadatelor:**
    - După ce imaginea este încărcată în S3, creați o înregistrare în baza de date RDS cu detaliile imaginii.
    - Construiți un endpoint API în aplicația dvs. Node.js care să gestioneze această funcționalitate. Utilizați un driver de bază de date compatibil cu Node.js, cum ar fi `mysql` pentru MySQL.

### 4. Analiza imaginilor cu AWS Rekognition
- **Analiza imaginilor:**
    - După ce o imagine este încărcată în S3, folosiți AWS Rekognition pentru a analiza imaginea.
    - Configurați permisiunile necesare în IAM pentru ca Rekognition să poată accesa bucket-ul S3.
    - Analizați imaginea pentru a extrage etichete și alte date relevante. Aceste informații pot include obiecte, scene și activități detectate în imagine.

- **Stocarea rezultatelor analizei:**
  - După ce AWS Rekognition analizează imaginea, extrageți etichetele și nivelul de încredere al fiecărei etichete.
  - Pentru fiecare etichetă returnată de Rekognition, inserați o înregistrare în noul tabel din RDS, specificând `image_id`, `label`, `confidence` și `timestamp`.

### 5. Funcții Lambda pentru automatizare
- **Crearea funcțiilor Lambda:**
    - Accesați consola AWS și navigați la Lambda.
    - Creați o nouă funcție Lambda și denumiți-o corespunzător.
    - Configurați funcția Lambda pentru a fi declanșată automat atunci când o imagine este încărcată în S3. Aceasta se face configurând un declanșator S3 în funcția Lambda.

- **Automatizarea proceselor:**
    - Funcția Lambda ar trebui să gestioneze analiza imaginii folosind Rekognition și să salveze rezultatele în RDS.
    - De asemenea, funcția Lambda ar trebui să trimită o notificare SNS după ce analiza este completă.
    - Configurați permisiunile IAM pentru funcția Lambda astfel încât să poată accesa S3, RDS, Rekognition și SNS.

### 6. Notificări SNS
- **Configurarea SNS:**
    - Accesați consola AWS și navigați la SNS.
    - Creați un topic SNS și `fii-cloud-notifier`.
    - Adăugați abonamente la topic-ul SNS pentru a primi notificările prin email sau SMS. Configurați adresele de email și numerele de telefon necesare.

- **Trimiterea notificărilor:**
    - După ce imaginea a fost încărcată și analizată, trimiteți o notificare SNS din AWS Lambda.

### 7. Integrarea tuturor componentelor
- **Integrați toate componentele:**
    - Asigurați-vă că toate componentele sunt integrate corect și funcționează împreună.
    - Testați întregul flux: încărcarea unei imagini în S3, declanșarea funcției Lambda, analiza imaginii, salvarea metadatelor și trimiterea notificării SNS.
    - Verificați că datele sunt stocate corect în RDS și că notificările sunt trimise corespunzător.

## Scop
Această temă vă va ajuta să înțelegeți cum să integrați diverse servicii AWS într-o aplicație complet funcțională. Veți exersa utilizarea AWS SDK în Node.js și veți învăța cum să automatizați procesele folosind funcții Lambda. De asemenea, veți înțelege importanța securității și gestionării permisiunilor în AWS.
