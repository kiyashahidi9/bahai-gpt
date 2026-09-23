import config from '../utils/config.js'
import { Pool } from 'pg'
import { PostgresError } from '../utils/customErrors.js'

const writingsPool = new Pool({
    connectionString: config.WRITINGS_DATABASE_URL,
    // ssl: { rejectUnauthorized: false }
})

writingsPool.on('error', (error) => {
    throw new PostgresError(`Couldn't connect to PostgreSQL: ${error}`)
})

export default writingsPool