export interface InputChat {
    role: string
    content: string
}

export interface Conversation {
    id: number
    title: string
    created_at: string
}

export interface Chat {
    id: number
    role: string
    content: string
    created_at: string
    conversation_id: number
}