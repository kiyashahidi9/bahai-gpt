import dotenv from 'dotenv'
dotenv.config()

const {
    PORT,
    DATABASE_URL,
    WRITINGS_DATABASE_URL,
    JWT_EXPIRES_IN,
    JWT_SECRET,
    API_KEY,
} = process.env

const GPT_MODEL = 'gpt-5-mini-2025-08-07'
const EMBEDDING_MODEL = 'text-embedding-3-small'

export default {
    PORT,
    DATABASE_URL,
    WRITINGS_DATABASE_URL,
    JWT_EXPIRES_IN,
    JWT_SECRET,
    API_KEY,
    GPT_MODEL,
    EMBEDDING_MODEL,
}