import config from '../utils/config.js';
import { Pool } from 'pg';
import { PostgresError } from '../utils/customErrors.js';
const chatPool = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
});
chatPool.on('error', (error) => {
    throw new PostgresError(`Couldn't connect to PostgreSQL: ${error}`);
});
export default chatPool;
//# sourceMappingURL=chatPool.js.map