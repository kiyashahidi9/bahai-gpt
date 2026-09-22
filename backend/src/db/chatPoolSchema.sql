-- Safe to re-run: uses IF NOT EXISTS guards throughout.
 
-- ============================================================
-- users
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id            SERIAL PRIMARY KEY,
    username      TEXT NOT NULL,
    password_hash  TEXT NOT NULL,
    created_at    TIMESTAMP DEFAULT NOW()
);
 
-- ============================================================
-- conversations
-- One user (1) : many conversations (0..n)
-- ============================================================
CREATE TABLE IF NOT EXISTS conversations (
    id          SERIAL PRIMARY KEY,
    title       TEXT DEFAULT 'untitled',
    created_at  TIMESTAMP DEFAULT NOW(),
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
 
-- ============================================================
-- chats
-- One conversation (1) : many chats (0..n)
-- ============================================================
CREATE TABLE IF NOT EXISTS chats (
    id              SERIAL PRIMARY KEY,
    role            TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'developer', 'tool')),
    content         TEXT NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW(),
    conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE
);
 
-- ============================================================
-- Helpful indexes for FK lookups
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chats_conversation_id ON chats(conversation_id);
 
