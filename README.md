# Povzetek projekta

Projekt je sestavljen iz spletne aplikacije za pregled nad logi iz različnih zunanjih aplikacij v okviru posameznih projektov. Prav tako je priložena še testna skripta za avtomatsko generiranje in pošiljanje logov na strežnik.

Na začetku se prijavimo s svojim uporabniškim računom nato pa lahko brskamo po sekcijah za uporabnike in projekte. Če imamo administratorski račun lahko v sekciji za uporabnike ustvarjamo nove uporabniške račune, ter brišemo že obstoječe. Uporabniki lahko v sekciji za projekte dodajo nove projekte za zbiranje logov. Ob ustvaritvi novega projetkta se zgenerira novi API ključ, preko katerega lahko pošiljamo zahtevke za dodajanje novih logov. Za posamezen projekt lahko vidimo vse asociirane loge, v primeru administratorija pa lahko projektu tudi na novo zgeneriramo ključ ali pa celoten projekt vključno z njegovimi logi izbrišemo iz sistema.

<br>
<br>
<br>

## Zagon spletne aplikacije

### 1. Klonirajte repozitorij

```bash
git pull
```

### 2. Ustvarite `.env` datototeke za čelni (frontend) in zaledni del (backend)

#### Backend `.env` (`./backend/.env`):

```
MONGO_URI=<mongo db connection string>
PORT=3000
FRONTEND_URL=http://localhost:3001
JWT_SECRET=<jwt secret>
NODE_ENV=development
```

#### Frontend `.env` (`./frontend/.env`):

```
VITE_BACKEND_URL=http://localhost:3000
```

### 3. Zaženite aplikacijo preko Docker-ja

Iz root-a projekta:

```bash
docker compose up
```

-   Ukaz bo zgradil in zagnal **frontend** in **backend** kontejnerje.
-   Frontend bo dostopen na: `http://localhost:3001`
-   Backend bo dostopen na: `http://localhost:3000`

<br>
<br>
<br>

## Zagon testne skripte

Skripta je locirana v `./scripts/LogGenerator.ts`.

### 1. Premaknite se v `scripts` direktorij:

```bash
cd ./scripts
```

### 2. Ustvarite `.env` datoteko (`./scripts/.env`) z:

```
BACKEND_URL=http://localhost:3000
API_KEY=<project_api_key>
```

### 3. Zaženite skripto:

-   Opcija 1 (npm script):

```bash
npm run test-logs
```

-   Opcija 2 (direktno z ts-node):

```bash
npx ts-node LogGenerator.ts
```
