// CHAT QUERIES
const GET_ALL_CONVERSATIONS = `
SELECT id, title, created_at FROM conversations
WHERE user_id = $1
ORDER BY created_at DESC
`

const GET_ALL_CHATS_FOR_CONVERSATION = `
SELECT ch.*
FROM chats ch
JOIN conversations co ON co.id = ch.conversation_id
WHERE ch.conversation_id = $1 AND co.user_id = $2
ORDER BY created_at ASC
`

const CREATE_NEW_CONVERSATION = `
INSERT INTO conversations (title, user_id) VALUES ($1, $2)
RETURNING id, title, created_at
`

const CREATE_NEW_CHAT_FOR_CONVERSATION = `
INSERT INTO chats (role, content, conversation_id)
SELECT $1, $2, id
FROM conversations
WHERE id = $3 AND user_id = $4
RETURNING *
`

const DELETE_CONVERSATION = `
DELETE FROM conversations
WHERE id = $1 AND user_id = $2
RETURNING *
`

const UPDATE_CONVERSATION_TITLE = `
UPDATE conversations
SET title = $1
WHERE id = $2 AND user_id = $3
RETURNING *
`

// AUTH QUERIES
const CREATE_NEW_USER = `
INSERT INTO users (username, password_hash)
VALUES ($1, $2)
RETURNING *
`

const GET_USER = `
SELECT
    id,
    username,
    password_hash AS "passwordHash",
    created_at AS "createdAt"
FROM users
WHERE username = $1
`

const USER_EXISTS = `
SELECT 1 FROM users
WHERE username = $1
`

const queries = {
    GET_ALL_CHATS_FOR_CONVERSATION,
    GET_ALL_CONVERSATIONS,
    CREATE_NEW_CHAT_FOR_CONVERSATION,
    CREATE_NEW_CONVERSATION,
    DELETE_CONVERSATION,
    UPDATE_CONVERSATION_TITLE,
    CREATE_NEW_USER,
    GET_USER,
    USER_EXISTS,
}

export default queries