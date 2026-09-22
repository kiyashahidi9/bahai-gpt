import axios from "axios";
import type { InputChat, Conversation } from "../types/chats";
const baseURL = '/api/conversations'

async function getAllConversations(): Promise<Conversation[]> {
    const conversations = await axios.get(baseURL)
    return conversations.data
}

async function getAllChatsForConversation(conversationId: string) {
    const chats = await axios.get(`${baseURL}/${conversationId}/chats`)
    return chats.data
}

async function createNewConversation(title: string): Promise<Conversation> {
    const newConversation = await axios.post(`${baseURL}`, { title })
    return newConversation.data
}

async function createNewChatForConversation(conversationId: string, chat: InputChat) {
    const newChat = await axios.post(`${baseURL}/${conversationId}/chats`, chat)
    return newChat.data
}

async function deleteConversation(conversationId: string) {
    const deletedConversation = await axios.delete(`${baseURL}/${conversationId}`)
    return deletedConversation.data
}

async function updateConversationTitle(conversationId: string, newTitle: string) {
    const updatedConversation = await axios.patch(`${baseURL}/${conversationId}`, { title: newTitle })
    return updatedConversation.data
}

export default {
    getAllConversations,
    getAllChatsForConversation,
    createNewConversation,
    createNewChatForConversation,
    deleteConversation,
    updateConversationTitle,
}