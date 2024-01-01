import pg from 'pg'
const {Client} = pg
import config from '../config/config.js'

// eslint-disable-next-line func-style
async function testDbSetup() {
  const pgclient = new Client({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: 'postgres'
  })

  pgclient.connect()
  await pgclient.query('DROP DATABASE IF EXISTS postgres_test')
  await pgclient.query('CREATE DATABASE postgres_test')
  pgclient.end()
}

testDbSetup().then(() => {
  console.log('Test DB setup successfully')
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit()
})
