import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Chat } from '../../types/chats'

function ChatMessage({ chat }: { chat: Chat }) {
    return (
        <div className={`chat-message ${chat.role === 'user' ? 'chat-message-user' : 'chat-message-assistant'}`}>
            <div className="chat-message-bubble">
                {chat.role === 'user' ? (
                    chat.content
                ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{chat.content}</ReactMarkdown>
                )}
            </div>
        </div>
    )
}

export default ChatMessage
