# ModernFi Full Stack Take Home

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
1. Create the postgres database `psql postgres -c 'CREATE DATABASE postgres;'`
   - You can always reset the database with `psql postgres -c 'DROP DATABASE postgres;' ; psql postgres -c 'CREATE DATABASE postgres;'`
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

