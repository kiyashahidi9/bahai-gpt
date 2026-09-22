import { AuthorizationError, ValidationError } from '../utils/customErrors.js';
import {} from '../utils/auth.js';
import { queryAllConversations, queryAllChats, queryNewConversation, queryNewChat, queryDeleteConversation, queryUpdatedConversationTitle, } from '../models/chats.js';
export async function getAllConversations(req, res) {
    const authReq = req;
    const userId = authReq.user?.id;
    if (!userId)
        throw new AuthorizationError("Authorization required");
    const conversations = await queryAllConversations(userId);
    res.status(200).json(conversations);
}
export async function getAllChatsForConversation(req, res) {
    const authReq = req;
    const userId = authReq.user?.id;
    if (!userId)
        throw new AuthorizationError("Authorization required");
    const conversationId = Number(req.params.conversation_id);
    const conversations = await queryAllChats(userId, conversationId);
    res.status(200).json(conversations);
}
export async function createNewConversation(req, res) {
    const authReq = req;
    const userId = authReq.user?.id;
    if (!userId)
        throw new AuthorizationError("Authorization required");
    const title = req.body.title;
    const newConversation = await queryNewConversation(userId, title);
    res.status(201).json(newConversation);
}
export async function createNewChatForConversation(req, res) {
    const authReq = req;
    const userId = authReq.user?.id;
    if (!userId)
        throw new AuthorizationError("Authorization required");
    const conversationId = Number(req.params.conversation_id);
    const { role, content } = req.body;
    const newChat = await queryNewChat(userId, role, content, conversationId);
    res.status(201).json(newChat);
}
export async function deleteConversation(req, res) {
    const authReq = req;
    const userId = authReq.user?.id;
    if (!userId)
        throw new AuthorizationError("Authorization required");
    const conversationId = Number(req.params.conversation_id);
    const deletedConversation = await queryDeleteConversation(userId, conversationId);
    res.status(200).json(deletedConversation);
}
export async function updateConversationTitle(req, res) {
    const authReq = req;
    const userId = authReq.user?.id;
    if (!userId)
        throw new AuthorizationError("Authorization required");
    const conversationId = Number(req.params.conversation_id);
    const newTitle = req.body.title;
    const updatedConversation = await queryUpdatedConversationTitle(userId, conversationId, newTitle);
    res.status(200).json(updatedConversation);
}
//# sourceMappingURL=chatControllers.js.map