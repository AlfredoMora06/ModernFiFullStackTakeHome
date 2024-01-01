import dotenv from "dotenv";

dotenv.config();

const environment = process.env.NODE_ENV;
const dbName = process.env.DB_NAME;

const config = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: dbName,
  env: environment,
  url: {
    app: process.env.REACT_APP_URL,
  },
  standardDbConfig: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: dbName,
    },
  },
};

const checkConfigSetup = () => {};

checkConfigSetup();

export default config;
