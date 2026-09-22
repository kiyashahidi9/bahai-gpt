import axios from "axios";
import type { LLMQuery } from "../types/llm";
const baseURL = '/api/llm'

async function queryLLM(query: LLMQuery, conversationId: string) {
    const result = await axios.post(`${baseURL}/${conversationId}`, query)
    return result.data
}

async function newTitleSummary(query: string) {
    const result = await axios.post(`${baseURL}/new`, { query })
    return result.data
}

export default {
    queryLLM,
    newTitleSummary,
}