## Ghid: Ghid pentru Implementarea Observabilității și Instrumentării în Azure

**Introducere în Observabilitate și Instrumentare**

Observabilitatea este capacitatea de a înțelege starea internă a unui sistem complex pe baza datelor de ieșire pe care acesta le produce, precum loguri, urme și metrici. Aceasta este esențială pentru identificarea și rezolvarea problemelor, optimizarea performanței și asigurarea funcționării corespunzătoare a aplicațiilor și serviciilor.

1. **Logs (Jurnale)**

Jurnalele sunt înregistrări textuale ale evenimentelor care se produc în cadrul unei aplicații sau al unui sistem. Ele oferă detalii despre erori, avertismente și alte evenimente semnificative, ajutând la diagnosticarea și depanarea problemelor.

2. **Traces (Urme)**

Urmele reprezintă înregistrări ale fluxului de cereri (requests) printr-o aplicație distribuită. Ele ajută la urmărirea cererilor de la un capăt la altul, identificând astfel punctele de blocaj sau problemele de performanță.

3. **Metrics (Metrici)**

Metricile sunt valori numerice care oferă informații despre performanța și sănătatea sistemului. Acestea includ metrici precum utilizarea CPU, memorie, latență și rate de erori.

**Utilizarea Azure Monitor și Application Insights**

În Azure, putem implementa observabilitatea folosind Azure Monitor împreună cu Application Insights. Azure Monitor colectează, analizează și acționează pe baza telemetriei din mediul cloud și local, oferind o imagine holistică asupra performanței și sănătății aplicațiilor.

Azure Monitor ne ajută să:

- Colectăm date despre performanța și utilizarea resurselor.
- Identificăm și diagnosticăm problemele cu ajutorul jurnale și metrici.
- Configurăm alerte pentru evenimente critice.


Application Insights este un serviciu Azure care extinde funcționalitățile Azure Monitor pentru a colecta telemetrie din aplicațiile noastre. Acesta ne ajută să:

- Monitorizăm performanța aplicațiilor în timp real.
- Analizăm fluxul de cereri și urme pentru a identifica problemele de performanță.
- Vizualizăm și analizăm datele telemetrice pentru a îmbunătăți experiența utilizatorului final.

**Utilizarea OpenTelemetry pentru Observabilitate**
OpenTelemetry este un set de instrumente open-source și standardizate pentru colectarea de date de telemetrie (loguri, urme și metrici) din aplicațiile noastre. Utilizând OpenTelemetry, putem asigura compatibilitatea și integrarea facilă cu diverse platforme de observabilitate, inclusiv Azure Monitor și Application Insights.



### Pasul 1: Configurarea Azure Monitor și Application Insights

1. Deschide [Azure Portal](https://portal.azure.com/) într-un browser web.

2. În partea dreaptă sus a ecranului, click pe iconița de Cloud Shell (ar trebui să arate ca un terminal).

3. Dacă este prima dată când folosești Cloud Shell, va trebui să alegi între Bash și PowerShell. Pentru acest ghid, vom folosi Bash. Dacă ai deja configurat Cloud Shell, poți sări peste acest pas.

4. Executati urmatoarea comanda pentru a configura variabilele de mediu:
```bash
$resourceGroup = "rg-aplicatie-laborator"
$appInsights = "aplicatie-insights"
$actionGroup = "grup-actiune"
```

5. În Cloud Shell, execută următoarea comandă pentru a crea un resource group numit "aplicatie-laborator" în regiunea "westeurope":
```bash
az group create --name $resourceGroup --location westeurope
```
Explicație Comandă
- az group create este comanda Azure CLI pentru a crea un nou resource group.
- --name aplicatie-laborator specifică numele resource group-ului.
- --location westeurope specifică regiunea în care va fi creat resource group-ul.

6. Crearea unui Application Insights

```bash
az monitor app-insights component create --app $appInsights --location westeurope --resource-group $resourceGroup --application-type web
$connectionString = (az monitor app-insights component show --resource-group $resourceGroup --app $appInsights --query connectionString --output tsv)
$connectionString
```

Salvați proprietatea **connectionString** rezultată.

### Pasul 2: Ghid de Instalare pentru Utilitarul Azure Developer CLI (azd)

Azure Developer CLI (azd) este un instrument de linie de comandă care ajută dezvoltatorii să creeze, să implementeze și să gestioneze aplicații în Azure. Acest ghid te va conduce prin pașii necesari pentru a instala utilitarul azd pe diverse platforme.

[Detalii instalare](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/install-azd?tabs=winget-windows%2Cbrew-mac%2Cscript-linux&pivots=os-windows)


1. Rulează in PowerShell urmatorul scriptȘ

```PowerShell
powershell -ex AllSigned -c "Invoke-RestMethod 'https://aka.ms/install-azd.ps1' | Invoke-Expression"
```

2. Autentificare azd

```bash
azd auth login
```

### Pasul 3: Configurarea aplicației si deploy-ul folosind Azure
//todo imagine diagrama?
Urmatoarele comenzi trebuie executate in folder /samples/azure-cloud-sample/observability-sample/Obserability.Sample

1. Modificati fisierul **Obserability.Sample.AppHost/appsettings.json**.
- Setati valoarea **APPLICATIONINSIGHTS_CONNECTION_STRING**.

2. Ruleaza urmatorii pasi

```bash
azd init
```

 - selectare folder current
 - nume: aplicatie-laborator

```bash
azd up
```
- selectare subscriptie curenta
- selectare WestEurope


 Container App Environments reprezintă un serviciu gestionat în cadrul Azure care permite rularea și gestionarea aplicațiilor containerizate într-un mod simplu și scalabil. Este parte din oferta Azure Container Apps, care se bazează pe Kubernetes și alte tehnologii open-source pentru a facilita rularea aplicațiilor containerizate fără a necesita gestionarea directă a infrastructurii Kubernetes.

 **Caracteristicile principale ale Container App Environments:**

1. Scalabilitate automatizată:
    - Suportă auto-scaling pe baza metricilor de utilizare, cum ar fi CPU și memorie, precum și pe baza mesajelor dintr-o coadă sau alte surse de evenimente.
2. Integrări cu alte servicii Azure:
- Se integrează ușor cu Azure Monitor pentru monitorizarea performanței și diagnosticare.
- Suportă integrarea cu Azure DevOps sau GitHub Actions pentru pipeline-uri CI/CD.

3. Medii izolate:
- Fiecare Container App Environment reprezintă un mediu izolat, care poate găzdui una sau mai multe aplicații containerizate.
- Oferă izolare la nivel de rețea și resurse, ceea ce permite gestionarea mai ușoară a aplicațiilor în funcție de nevoile lor specifice.

4. Securitate și conformitate:

- Beneficiază de securitatea oferită de Azure, inclusiv autentificarea și autorizarea prin Azure Active Directory.
- Suportă standardele și cerințele de conformitate impuse de diverse industrii.

### Pasul 4: Crearea unui action group

Pentru a crea un action group cu numele "grup-actiune", Display Name "Grup actiune", și notificări prin Email și SMS, urmează acești pași:

Inlocuieste urmatoarele variabile
- Email cu email pe care doresti sa fii notificat
- COD_TARA cu codul tarii. Pentru romania 40, pentru Moldova 373
- Telefon cu numarul de telefon pe care doresti sa fii notificat (fara codul tarii).

```bash
az monitor action-group create --resource-group $resourceGroup --name $actionGroup --short-name GrupAct --action email admin EMAIL --action sms admin2 COD_TARA TELEFON
```
Explicația comenzii:
- --resource-group rg-aplicatie-laborator: Numele grupului de resurse în care va fi creat action group-ul.
- --name grup-actiune: Numele action group-ului.
- --short-name GrupAct: Un nume scurt pentru action group, util pentru identificare rapidă.
- --action email admin EMAIL: Adăugarea unei notificări prin email.
- --action sms admin TELEFON: Adăugarea unei notificări prin SMS.

### Pasul 5. Obtine id-urile pentru grupul de actiune creat anterior si pentru aplicatia de Application Insights.

```bash
$actionGroupId = (az monitor action-group show --resource-group $resourceGroup --name $actionGroup --query id --output tsv)
$appInsightsId = (az monitor app-insights component show --resource-group $resourceGroup --app $appInsights --query id --output tsv)

$actionGroupId
$appInsightsId
```

### Pasul 6

Vizualizare metrici suportate:

```bash
az monitor metrics list-definitions --resource $appInsightsId --output table
```


Crearea alertei: 
```bash
az monitor metrics alert create -g $resourceGroup --name FailedRequestsAlert --scopes $appInsightsId --condition "count requests/failed >= 5 where request/resultCode includes 503" --evaluation-frequency "1m" --window-size "5m" --description "Alert when failed requests with code 503 exceed 5 in the past 5 minutes" -a $actionGroupId      
```

Explicația comenzii:
--scopes Resource-ID-Application-Insights: ID-ul resursei Application Insights.
--condition "total requests/failed >= 5 where resultCode == 503": Condiția alertei.
total requests/failed: Se referă la numărul total de cereri eșuate.
>= 5: Condiția numerică (dacă numărul total de cereri eșuate este mai mare sau egal cu 5).
where resultCode == 503: Condiția suplimentară (dacă codul rezultat este 503).
--evaluation-frequency "1m": Frecvența evaluării (la fiecare minut).
--window-size "5m": Perioada de timp pentru evaluare (ultimele 5 minute).
--description "Alert when failed requests with code 503 exceed 5 in the past 5 minutes": Descrierea alertei.
--action-group $ACTION_GROUP_ID: ID-ul action group-ului creat anterior.

### Pasul 5: Stergerea resurselor

**Este foarte important ca dupa ce ati inspectat resursele create sa le stergeti pentru a nu crea costuri suplimentare**.



```bash
az group delete --name $resourceGroup
```