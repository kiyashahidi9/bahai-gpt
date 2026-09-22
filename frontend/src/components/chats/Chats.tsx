import { useState, useEffect, useRef, type SyntheticEvent, type KeyboardEvent } from 'react'
import { useParams, useNavigate, useOutletContext, Navigate } from 'react-router-dom'
import chatService from '../../services/chatService'
import llmService from '../../services/llmService'
import type { Chat, Conversation } from '../../types/chats'
import type { LLMQuery } from '../../types/llm'
import ChatMessage from './ChatMessage'
import ThinkingIndicator from './ThinkingIndicator'

interface ConversationsOutletContext {
    conversations: Conversation[]
    onConversationCreated: (conversation: Conversation) => void
    onConversationRenamed: (conversation: Conversation) => void
}

const EMPTY_CHATS_MESSAGE = 'yay!!!'
const MAX_INPUT_HEIGHT = 200

const testChats = [
    {
        id: 1,
        role: 'assistant',
        content: 'yo!',
        created_at: 'some random time',
        conversation_id: 1
    }
]

function Chats() {
    const { conversationId } = useParams()
    const navigate = useNavigate()
    const { conversations, onConversationCreated, onConversationRenamed } = useOutletContext<ConversationsOutletContext>()
    const currentConversation = conversations.find((c) => String(c.id) === conversationId)
    const [chats, setChats] = useState<Chat[]>(testChats)
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [error, setError] = useState('')

    const [question, setQuestion] = useState('')
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false)

    const chatsEndRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const shouldScrollRef = useRef(true)

    // loads the chat history whenever the selected conversation changes
    useEffect(() => {
        setShouldRedirect(false)
        setError('')
        setQuestion('')

        if (conversationId) {
            getChats()
        } else {
            // no conversation exists yet for the "new conversation" draft page
            setChats([])
        }
    }, [conversationId])

    // scrolls to the latest message, but only when explicitly requested
    // (on load and when the user submits a question) - not when the llm's
    // response comes in, so the user isn't yanked away from where they're reading
    useEffect(() => {
        if (shouldScrollRef.current) {
            chatsEndRef.current?.scrollIntoView()
            shouldScrollRef.current = false
        }
    }, [chats])

    // auto-focuses the input for a conversation with no messages yet
    useEffect(() => {
        if (chats.length === 0) {
            textareaRef.current?.focus()
        }
    }, [chats])

    // grows the input with its content, up to a max height
    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        textarea.style.height = 'auto'
        const newHeight = Math.min(textarea.scrollHeight, MAX_INPUT_HEIGHT)
        textarea.style.height = `${newHeight}px`
        textarea.style.overflowY = textarea.scrollHeight > MAX_INPUT_HEIGHT ? 'auto' : 'hidden'
    }, [question])

    // submits on Enter, allows Shift+Enter for a new line
    function handleQuestionKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            e.currentTarget.form?.requestSubmit()
        }
    }

    async function getChats() {
        if (!conversationId) return

        try {
            const result = await chatService.getAllChatsForConversation(conversationId)
            shouldScrollRef.current = true
            setChats(result)
        } catch (e) {
            setShouldRedirect(true)
        }
    }

    // saves question, queries llm and displays response
    async function handleQuestionSubmit(e: SyntheticEvent) {
        e.preventDefault()
        if (!question.trim() || isWaitingForResponse) return

        const query = question
        setIsWaitingForResponse(true)

        try {
            // this is the "new conversation" draft page, so create the conversation right away
            // (using the query as a placeholder title) and head to its real URL immediately,
            // without waiting on the llm
            let targetConversationId = conversationId
            if (!targetConversationId) {
                const newConversation = await chatService.createNewConversation(query)
                onConversationCreated(newConversation)
                targetConversationId = String(newConversation.id)
                navigate(`/chats/${targetConversationId}`, { replace: true })

                // fills in a proper title in the background once it's ready
                llmService.newTitleSummary(query)
                    .then((title) => chatService.updateConversationTitle(targetConversationId!, title))
                    .then((updated) => onConversationRenamed(updated))
                    .catch(() => {})
            }

            // saves question
            const newChat = {
                role: 'user',
                content: query,
            }
            const result = await chatService.createNewChatForConversation(targetConversationId, newChat)

            let updatedChats = [...chats, result]
            shouldScrollRef.current = true
            setChats(updatedChats)
            setQuestion('')

            // formats history and queries llm
            const chatHistory = chats.map(chat => {
                return {
                    role: chat.role,
                    content: chat.content,
                }
            })

            const llmQuery: LLMQuery = {
                query: query,
                history: chatHistory
            }

            const llmResponse = await llmService.queryLLM(llmQuery, targetConversationId)
            updatedChats = [...updatedChats, llmResponse]
            setChats(updatedChats)

        } catch (e) {
            setError('an unexpected error occured')
        } finally {
            setIsWaitingForResponse(false)
        }
    }

    if (shouldRedirect) {
        console.error("Invalid Conversation ID")
        return <Navigate to="/chats" replace/>
    }

    const questionInput = (
        <textarea
            ref={textareaRef}
            value={question}
            onChange={(e) => {setQuestion(e.target.value)}}
            onKeyDown={handleQuestionKeyDown}
            rows={1}
            className="chats-input"
        />
    )

    const questionDisclaimer = (
        <div className="chats-disclaimer">
            This is a non-sentient AI chatbot that provides statistically likely answers based off of the Baha'i Writings. It is not authoritative!
        </div>
    )

    const chatsHeader = currentConversation && (
        <div className="chats-header">
            <div className="chats-header-title">{currentConversation.title}</div>
        </div>
    )

    if (chats.length === 0) {
        return (
            <div className="chats-page">
                {chatsHeader}
                {error && <p className="chats-error">{error}</p>}

                <div className="chats-empty">
                    <div className="chats-empty-message">{EMPTY_CHATS_MESSAGE}</div>
                    <form onSubmit={handleQuestionSubmit} className="chats-form chats-form-centered">
                        {questionInput}
                        {questionDisclaimer}
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="chats-page">
            {chatsHeader}
            {error && <p className="chats-error">{error}</p>}

            {/* displaying the chats */}
            <div className="chats-messages">
                <div className="chats-messages-inner">
                    {chats.map((chat) => (
                        <ChatMessage key={chat.id} chat={chat} />
                    ))}
                    {isWaitingForResponse && <ThinkingIndicator />}
                    <div ref={chatsEndRef} />
                </div>
            </div>

            <form onSubmit={handleQuestionSubmit} className="chats-form">
                {questionInput}
                {questionDisclaimer}
            </form>

        </div>
    )
}

export default Chats