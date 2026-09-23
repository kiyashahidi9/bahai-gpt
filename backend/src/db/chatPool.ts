import config from '../utils/config.js'
import { Pool } from 'pg'
import { PostgresError } from '../utils/customErrors.js'

const chatPool = new Pool({
    connectionString: config.DATABASE_URL,
    // ssl: { rejectUnauthorized: false }
})

chatPool.on('error', (error) => {
    throw new PostgresError(`Couldn't connect to PostgreSQL: ${error}`)
})

export default chatPool