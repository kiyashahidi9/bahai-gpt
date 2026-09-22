import chatPool from "../db/chatPool.js";
import queries from "./queries.js";
export async function queryAllConversations(userId) {
    const query = queries.GET_ALL_CONVERSATIONS;
    const conversations = await chatPool.query(query, [userId]);
    return conversations.rows;
}
export async function queryAllChats(userId, conversationId) {
    const query = queries.GET_ALL_CHATS_FOR_CONVERSATION;
    const chats = await chatPool.query(query, [conversationId, userId]);
    return chats.rows;
}
export async function queryNewConversation(userId, title) {
    const query = queries.CREATE_NEW_CONVERSATION;
    const newConversation = await chatPool.query(query, [title, userId]);
    return newConversation.rows[0];
}
export async function queryNewChat(userId, role, content, conversationId) {
    const query = queries.CREATE_NEW_CHAT_FOR_CONVERSATION;
    const newChat = await chatPool.query(query, [role, content, conversationId, userId]);
    return newChat.rows[0];
}
export async function queryDeleteConversation(userId, conversationId) {
    const query = queries.DELETE_CONVERSATION;
    const deletedConversation = await chatPool.query(query, [conversationId, userId]);
    return deletedConversation.rows[0];
}
export async function queryUpdatedConversationTitle(userId, conversationId, newTitle) {
    const query = queries.UPDATE_CONVERSATION_TITLE;
    const updatedConversation = await chatPool.query(query, [newTitle, conversationId, userId]);
    return updatedConversation.rows[0];
}
//# sourceMappingURL=chats.js.map