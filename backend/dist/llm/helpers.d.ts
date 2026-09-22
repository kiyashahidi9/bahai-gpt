import type { ChatHistory } from "../types/rag.js";
export declare function generateEmbedding(text: string): Promise<number[] | undefined>;
export declare function classifyQuery(query: string, history: ChatHistory): Promise<{
    category: "explainGeneralConcept" | "explainSpecificQuote" | "funsies" | "getRandomQuote" | "interpretation" | "notRelevant" | "simpleFact";
    searchQuery: string;
} | null>;
//# sourceMappingURL=helpers.d.ts.map