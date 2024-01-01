// PURPOSE: Creates database credentials for migrating databases via knex command

// ensuring that env vars are set up
import config from "./config/config.js"

const knexMigrationConfig = config.standardDbConfig

export default knexMigrationConfig
