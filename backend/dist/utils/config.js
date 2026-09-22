import dotenv from 'dotenv';
dotenv.config();
const { PORT, DB_NAME, DB_HOST, DB_PASSWORD, DB_USER, VDB_NAME, VDB_HOST, VDB_PASSWORD, VDB_USER, JWT_EXPIRES_IN, JWT_SECRET, API_KEY, } = process.env;
const DB_PORT = Number(process.env.DB_PORT);
const VDB_PORT = Number(process.env.VDB_PORT);
const GPT_MODEL = 'gpt-5-mini-2025-08-07';
const EMBEDDING_MODEL = 'text-embedding-3-small';
export default {
    PORT,
    DB_NAME,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
    JWT_EXPIRES_IN,
    JWT_SECRET,
    API_KEY,
    VDB_NAME,
    VDB_HOST,
    VDB_PASSWORD,
    VDB_USER,
    VDB_PORT,
    GPT_MODEL,
    EMBEDDING_MODEL,
};
//# sourceMappingURL=config.js.map