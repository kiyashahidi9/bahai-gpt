import type { AugmentedInput, ChatHistory, RelevantChunks } from "../types/rag.js";
export declare function getRelevantChunks(query: string): Promise<any[]>;
export declare function augmentInput(userQuery: string, chatHistory: ChatHistory, relevantChunks?: RelevantChunks): AugmentedInput;
//# sourceMappingURL=rag.d.ts.map