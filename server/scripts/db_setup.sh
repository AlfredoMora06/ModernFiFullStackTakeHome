psql postgres -U postgres -c "DROP DATABASE postgres" ; psql postgres -U postgres -c "CREATE DATABASE postgres" && npx knex migrate:latest
