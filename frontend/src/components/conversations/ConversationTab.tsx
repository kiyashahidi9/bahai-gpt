import { Link } from 'react-router-dom'
import type { Conversation } from '../../types/chats'
import type { MouseEvent } from 'react'
import ConversationMenu from './ConversationMenu'

interface ConversationTabProps {
    conversation: Conversation
    isActive: boolean
    onRename: () => void
    onDelete: () => void
}

function ConversationTab({ conversation, isActive, onRename, onDelete }: ConversationTabProps) {
    // keeps clicks on the menu from also navigating to the conversation
    function stopMenuClickFromNavigating(e: MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <li className="conversations-list-item">
            <Link
                to={`/chats/${conversation.id}`}
                className={`conversations-list-link${isActive ? ' active' : ''}`}
            >
                <span className="conversations-list-title">{conversation.title}</span>
                <span onClick={stopMenuClickFromNavigating}>
                    <ConversationMenu onRename={onRename} onDelete={onDelete} />
                </span>
            </Link>
        </li>
    )
}

export default ConversationTab
