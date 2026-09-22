import writingsPool from "../db/writingsPool.js";
import { generateEmbedding } from "./helpers.js";
const TOP_K = 30;
export async function getRelevantChunks(query) {
    const embeddedQuery = await generateEmbedding(query);
    const relevantChunks = await writingsPool.query(`
            SELECT
                author, book_title, section, content, source_url,
                embedding <=> $1 AS distance
            FROM bahai_writings
            ORDER BY distance
            LIMIT $2
        `, [JSON.stringify(embeddedQuery), TOP_K]);
    return relevantChunks.rows;
}
export function augmentInput(userQuery, chatHistory, relevantChunks) {
    let augmentedInput;
    if (relevantChunks) {
        const context = relevantChunks.map((chunk, i) => {
            return `
                [Source ${i + 1}: ${chunk.author}, 
                Book: "${chunk.book_title}" - Section: "${chunk.section}"
                \n\n
                ${chunk.content}
                \n\n
                Source URL: ${chunk.source_url}
                ]
            `;
        });
        augmentedInput = [
            ...chatHistory,
            {
                role: 'user',
                content: `Context from the Bahai writings:\n\n${context}\n\nUser Question: ${userQuery}`
            }
        ];
    }
    else {
        augmentedInput = [
            ...chatHistory,
            {
                role: 'user',
                content: `User Question: ${userQuery}`
            }
        ];
    }
    return augmentedInput;
}
//# sourceMappingURL=rag.js.map