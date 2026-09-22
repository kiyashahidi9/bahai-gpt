import type { Conversation } from "../types/chats"

export function getMostRecentConversation(conversations: Conversation[]): Conversation {
    return [...conversations].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0]
}
