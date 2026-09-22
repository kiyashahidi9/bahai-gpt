import express from 'express';
import { getAllConversations, getAllChatsForConversation, createNewConversation, createNewChatForConversation, deleteConversation, updateConversationTitle, } from '../controllers/chatControllers.js';
const chatRouter = express.Router();
chatRouter.get('/', getAllConversations);
chatRouter.get('/:conversation_id/chats', getAllChatsForConversation);
chatRouter.post('/', createNewConversation);
chatRouter.post('/:conversation_id/chats', createNewChatForConversation);
chatRouter.delete('/:conversation_id', deleteConversation);
chatRouter.patch('/:conversation_id', updateConversationTitle);
export default chatRouter;
//# sourceMappingURL=chatRouter.js.map