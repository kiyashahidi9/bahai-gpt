import { useState, useEffect } from "react"
import chatService from "../../services/chatService"
import type { Conversation } from "../../types/chats"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../auth/AuthProvider"
import { getMostRecentConversation } from "../../utils/dateHelpers"
import ConversationTab from "./ConversationTab"
import RenameConversationModal from "./RenameConversationModal"
import DeleteConversationModal from "./DeleteConversationModal"

const testConvos = [
    {
        id: 1,
        title: 'first convo!',
        created_at: 'some random date'
    }
]

function MainPage() {
    const [conversations, setConversations] = useState<Conversation[]>(testConvos)
    const [error, setError] = useState('')
    const [renamingConversation, setRenamingConversation] = useState<Conversation | null>(null)
    const [deletingConversation, setDeletingConversation] = useState<Conversation | null>(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const { conversationId } = useParams()

    // loads conversations
    useEffect(() => {getAllConversations()}, [])
    async function getAllConversations() {
        try {
            const result = await chatService.getAllConversations()
            setConversations(result)
        } catch (e) {
            setError('an unexpected error occured, try again')
        }
    }

    // when no conversation is selected, default to the most recently created one
    useEffect(() => {
        if (conversationId) return
        if (location.pathname !== '/chats') return
        if (conversations.length === 0) return

        const mostRecent = getMostRecentConversation(conversations)

        navigate(`/chats/${mostRecent.id}`, { replace: true })
    }, [conversations, conversationId, location.pathname, navigate])


    // adds a conversation created from the "new conversation" draft page to the sidebar
    function addConversationToList(conversation: Conversation) {
        setConversations((prev) => [conversation, ...prev])
    }

    // updates a conversation's title in the sidebar, e.g. after a rename or
    // once the llm-generated title comes back for a freshly created conversation
    function updateConversationInList(updated: Conversation) {
        setConversations((prev) =>
            prev.map((c) => c.id === updated.id ? { ...c, title: updated.title } : c)
        )
    }

    return (
        <div className="conversations-page">

            {/* left tab: conversations list */}
            <div className={`conversations-sidebar ${isSidebarOpen ? '' : 'conversations-sidebar-closed'}`}>
                <div className="conversations-sidebar-top">
                    <div className="conversations-sidebar-top-header">
                        <div className="conversations-sidebar-title">
                            <img src="/favicon.svg" alt="" className="sidebar-star-icon" />
                            <h1>BahaiGPT</h1>
                        </div>
                        <button
                            type="button"
                            className="sidebar-toggle-button"
                            aria-label="Hide sidebar"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            ‹
                        </button>
                    </div>
                    {error && <p>{error}</p>}

                    {/* Create a new conversation */}
                    <button className="sidebar-action-button" onClick={() => navigate('/chats/new')}>
                        New +
                    </button>
                </div>

                <ul className="conversations-list">
                    {conversations.map((conversation) => (
                        <ConversationTab
                            key={conversation.id}
                            conversation={conversation}
                            isActive={String(conversation.id) === conversationId}
                            onRename={() => setRenamingConversation(conversation)}
                            onDelete={() => setDeletingConversation(conversation)}
                        />
                    ))}
                </ul>

                <div className="conversations-sidebar-footer">
                    <button className="sidebar-action-button" onClick={auth.logout}>
                        Log Out
                    </button>
                    <button className="sidebar-action-button" onClick={() => navigate('/chats/info')}>
                        Info
                    </button>
                </div>
            </div>

            {!isSidebarOpen && (
                <button
                    type="button"
                    className="sidebar-toggle-button sidebar-toggle-button-floating"
                    aria-label="Show sidebar"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    ›
                </button>
            )}

            {/* right side: chats for the selected conversation */}
            <div className="conversations-main">
                <Outlet context={{
                    conversations,
                    onConversationCreated: addConversationToList,
                    onConversationRenamed: updateConversationInList,
                }} />
            </div>

            {renamingConversation && (
                <RenameConversationModal
                    conversation={renamingConversation}
                    onClose={() => setRenamingConversation(null)}
                    onRenamed={updateConversationInList}
                />
            )}

            {deletingConversation && (
                <DeleteConversationModal
                    conversation={deletingConversation}
                    onClose={() => setDeletingConversation(null)}
                    onDeleted={(deletedId: number) => {
                        setConversations((prev) => prev.filter((c) => c.id !== deletedId))
                        if (String(deletedId) === conversationId) {
                            navigate('/chats')
                        }
                    }}
                />
            )}
        </div>
    )
}

export default MainPage
