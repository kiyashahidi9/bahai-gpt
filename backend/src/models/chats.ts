import chatPool from "../db/chatPool.js";
import queries from "./queries.js";

export async function queryAllConversations(userId: number) {
    const query = queries.GET_ALL_CONVERSATIONS
    const conversations = await chatPool.query(query, [userId])
    return conversations.rows
}

export async function queryAllChats(userId: number, conversationId: number) {
    const query = queries.GET_ALL_CHATS_FOR_CONVERSATION
    const chats = await chatPool.query(query, [conversationId, userId])
    return chats.rows
}

export async function queryNewConversation(userId: number, title: string) {
    const query = queries.CREATE_NEW_CONVERSATION
    const newConversation = await chatPool.query(query, [title, userId])
    return newConversation.rows[0]
}

export async function queryNewChat(
    userId: number,
    role: string,
    content: string,
    conversationId: number,
) {
    const query = queries.CREATE_NEW_CHAT_FOR_CONVERSATION
    const newChat = await chatPool.query(query, [role, content, conversationId, userId])
    return newChat.rows[0]
}

export async function queryDeleteConversation(userId: number, conversationId: number) {
    const query = queries.DELETE_CONVERSATION
    const deletedConversation = await chatPool.query(query, [conversationId, userId])
    return deletedConversation.rows[0]
}

export async function queryUpdatedConversationTitle(userId: number, conversationId: number, newTitle: string) {
    const query = queries.UPDATE_CONVERSATION_TITLE
    const updatedConversation = await chatPool.query(query, [newTitle, conversationId, userId])
    return updatedConversation.rows[0]
}