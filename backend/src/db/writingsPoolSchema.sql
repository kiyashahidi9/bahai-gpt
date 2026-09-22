-- Requires pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================
-- bahai_writings
-- ============================================================
CREATE TABLE IF NOT EXISTS bahai_writings (
    id             SERIAL PRIMARY KEY,
    author         TEXT NOT NULL,
    book_title     TEXT NOT NULL,
    section        TEXT DEFAULT 'untitled',
    content        TEXT NOT NULL,
    source_url     TEXT,
    embedding      VECTOR(1536)
);

-- Index for similarity search (cosine distance shown; swap ops class if you use L2 or inner product)
CREATE INDEX IF NOT EXISTS idx_bahai_writings_embedding
ON bahai_writings USING hnsw (embedding vector_cosine_ops);