import { useState, type SyntheticEvent } from 'react'
import type { Conversation } from '../../types/chats'
import chatService from '../../services/chatService'
import Modal from '../common/Modal'

interface RenameConversationModalProps {
    conversation: Conversation
    onClose: () => void
    onRenamed: (conversation: Conversation) => void
}

function RenameConversationModal({ conversation, onClose, onRenamed }: RenameConversationModalProps) {
    const [title, setTitle] = useState(conversation.title)
    const [error, setError] = useState('')

    async function handleSave(e: SyntheticEvent) {
        e.preventDefault()

        try {
            const updated = await chatService.updateConversationTitle(String(conversation.id), title)
            onRenamed(updated)
            onClose()
        } catch (e) {
            setError('an unexpected error occured, try again')
        }
    }

    return (
        <Modal onClose={onClose}>
            <h2>Rename Conversation</h2>
            {error && <p className="modal-error">{error}</p>}

            <form onSubmit={handleSave}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="modal-input"
                    autoFocus
                />

                <div className="modal-actions">
                    <button type="submit" className="sidebar-action-button">Save</button>
                    <button type="button" className="sidebar-action-button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </Modal>
    )
}

export default RenameConversationModal
