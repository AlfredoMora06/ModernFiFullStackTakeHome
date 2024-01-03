# ModernFi Full Stack Take Home

Instructions found [here](https://gist.github.com/miguel250/c9a669a39bbcc6803c4df9c05bf01235).

# Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Development Scripts - Frontend

In the project directory (**enter the client folder** -- `cd client`), you can run:

**`npm install`**

installs dependencies

**`npm run start`**

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

---

<a name="env"></a>

# Environment Variables - Frontend

### .env

If you want to add a new environment variable, make sure that it begins with `REACT_APP_`, otherwise it will not be read.

Follow the link for more info: (https://create-react-app.dev/docs/adding-custom-environment-variables/)

```
REACT_APP_API_BASE_URL=http://localhost:8080/v1
REACT_APP_ENV=development
```

---

# Backend

<a name="scripts"></a>

## Available Scripts

In the project directory(**enter the server folder** -- `cd server`), you can run:

**`npm install`**

installs dependencies

**`npm run cbs`**

Creates a new build and runs the API locally.

**`npm run build`**

Create a new build of the app.

**`npm run create-migration [new migration name]`**

Creates a new migration file with the current timestamp and given name

**`npm run migrate-up`**

Runs any migration files that have not yet been run on the connected postgres database

<a name="database"></a>

# Local Database Setup

1. Install postgres 14 (On Mac, see below)
1. Create the postgres database `psql postgres -c 'CREATE DATABASE modernfi;'`
   - You can always reset the database with `psql postgres -c 'DROP DATABASE modernfi;' ; psql modernfi -c 'CREATE DATABASE modernfi;'`
1. Update with all relevant database schema: `npm run migrate-up`

---

## Testing

I created tests to account for user cases when creating the api. Make sure to run those by running the following scripts.

**`npm run test-setup`**

then

**`npm run test`**

---

## Recommended Install on Mac

Using [Homebrew](https://wiki.postgresql.org/wiki/Homebrew)

1. `brew install postgresql`
1. `brew services start postgresql`

---

<a name="env"></a>

# Environment Variables - Backend

### .env

```
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=Mysterio6199
DB_NAME=postgres
```

# Process

<img width="1512" alt="Screenshot 2024-01-03 at 9 58 11 AM" src="https://github.com/AlfredoMora06/ModernFiFullStackTakeHome/assets/33073152/c6923a29-6dfa-4b29-8ddf-d98cb0d41b3e">

Once entering a ticker the database will check to see if it's in there, if not the api will be creating one.

<img width="1512" alt="Screenshot 2024-01-03 at 9 58 34 AM" src="https://github.com/AlfredoMora06/ModernFiFullStackTakeHome/assets/33073152/9c8d6148-8bc8-4277-beb5-6c18a6eea80d">

If a ticker has just been created but not traded yet, you will not see the view ticker history button

<img width="1512" alt="Screenshot 2024-01-03 at 10 08 58 AM" src="https://github.com/AlfredoMora06/ModernFiFullStackTakeHome/assets/33073152/47a83a50-9434-47ba-9d9e-99ab6bc9386b">

Comparison

<img width="1512" alt="Screenshot 2024-01-03 at 10 09 15 AM" src="https://github.com/AlfredoMora06/ModernFiFullStackTakeHome/assets/33073152/750b9096-dbf3-4bbc-a094-e1b3ab2b4093">
<img width="1512" alt="Screenshot 2024-01-03 at 10 09 29 AM" src="https://github.com/AlfredoMora06/ModernFiFullStackTakeHome/assets/33073152/921a1faf-4499-4db2-9967-69f346558942">

View Ticker History



