interface LLMChat {
    role: string
    content: string
}

export interface LLMQuery {
    query: string
    history: LLMChat[]
}