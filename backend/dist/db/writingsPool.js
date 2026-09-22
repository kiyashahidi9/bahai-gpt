import config from '../utils/config.js';
import { Pool } from 'pg';
import { PostgresError } from '../utils/customErrors.js';
const writingsPool = new Pool({
    user: config.VDB_USER,
    host: config.VDB_HOST,
    database: config.VDB_NAME,
    password: config.VDB_PASSWORD,
    port: config.VDB_PORT,
});
writingsPool.on('error', (error) => {
    throw new PostgresError(`Couldn't connect to PostgreSQL: ${error}`);
});
export default writingsPool;
//# sourceMappingURL=writingsPool.js.map