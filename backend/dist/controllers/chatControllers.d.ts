import type { Request, Response } from 'express';
export declare function getAllConversations(req: Request, res: Response): Promise<void>;
export declare function getAllChatsForConversation(req: Request, res: Response): Promise<void>;
export declare function createNewConversation(req: Request, res: Response): Promise<void>;
export declare function createNewChatForConversation(req: Request, res: Response): Promise<void>;
export declare function deleteConversation(req: Request, res: Response): Promise<void>;
export declare function updateConversationTitle(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=chatControllers.d.ts.map