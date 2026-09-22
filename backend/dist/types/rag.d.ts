import type OpenAI from "openai";
export type Chat = OpenAI.Responses.EasyInputMessage;
export type ChatHistory = Chat[];
export interface Chunk {
    author: string;
    book_title: string;
    section: string;
    source_url?: string;
    content: string;
    distance: number;
}
export type RelevantChunks = Chunk[];
export type AugmentedInput = OpenAI.Responses.ResponseInput;
//# sourceMappingURL=rag.d.ts.map