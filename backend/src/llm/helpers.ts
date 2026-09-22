import config from "../utils/config.js"
import { z } from "zod"
import { zodTextFormat } from "openai/helpers/zod.mjs"
import { CLASSIFY_SP } from "./systemPrompts/classify.js"
import type { ChatHistory} from "../types/rag.js"
import { augmentInput } from "./rag.js"
import openai from "./openaiClient.js"

// GENERATE EMBEDDING
export async function generateEmbedding(text: string) {
    const embedding = await openai.embeddings.create({
        model: config.EMBEDDING_MODEL,
        input: text,
    })

    return embedding.data[0]?.embedding
}

// CLASSIFICATION

const CategorySchema = z.object({
    category: z.enum([
        'explainGeneralConcept',
        'explainSpecificQuote',
        'getRandomQuote',
        'interpretation',
        'simpleFact',
        'notRelevant',
        'funsies'
    ]),
    searchQuery: z.string()
})
export async function classifyQuery(query: string, history: ChatHistory) {
    const response = await openai.responses.parse({
        model: config.GPT_MODEL,
        instructions: CLASSIFY_SP,
        input: augmentInput(query, history),
        text: {
            format: zodTextFormat(CategorySchema, 'classification')
        }
    })

    return response.output_parsed
}