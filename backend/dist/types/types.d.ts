export interface Conversation {
    id: number;
    title: string;
    createdAt: string;
}
export interface Chat {
    id: number;
    role: string;
    content: string;
    createdAt: string;
    conversationId: number;
}
export type CreateConversationInput = Omit<Conversation, 'id' | 'createdAt'>;
export type CreateChatInput = Omit<Chat, 'id' | 'createdAt'>;
export interface User {
    id: number;
    username: string;
    passwordHash: string;
    createdAt: string;
}
export type CreateUserInput = Omit<User, 'id' | 'createdAt'>;
//# sourceMappingURL=types.d.ts.map