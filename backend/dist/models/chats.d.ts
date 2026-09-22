export declare function queryAllConversations(userId: number): Promise<any[]>;
export declare function queryAllChats(userId: number, conversationId: number): Promise<any[]>;
export declare function queryNewConversation(userId: number, title: string): Promise<any>;
export declare function queryNewChat(userId: number, role: string, content: string, conversationId: number): Promise<any>;
export declare function queryDeleteConversation(userId: number, conversationId: number): Promise<any>;
export declare function queryUpdatedConversationTitle(userId: number, conversationId: number, newTitle: string): Promise<any>;
//# sourceMappingURL=chats.d.ts.map