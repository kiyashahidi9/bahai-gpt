import { useState } from 'react'
import type { Conversation } from '../../types/chats'
import chatService from '../../services/chatService'
import Modal from '../common/Modal'

interface DeleteConversationModalProps {
    conversation: Conversation
    onClose: () => void
    onDeleted: (conversationId: number) => void
}

function DeleteConversationModal({ conversation, onClose, onDeleted }: DeleteConversationModalProps) {
    const [error, setError] = useState('')

    async function handleDelete() {
        try {
            await chatService.deleteConversation(String(conversation.id))
            onDeleted(conversation.id)
            onClose()
        } catch (e) {
            setError('an unexpected error occured, try again')
        }
    }

    return (
        <Modal onClose={onClose}>
            <p>Delete "{conversation.title}"? This cannot be undone.</p>
            {error && <p className="modal-error">{error}</p>}

            <div className="modal-actions">
                <button type="button" className="sidebar-action-button" onClick={handleDelete}>Confirm</button>
                <button type="button" className="sidebar-action-button" onClick={onClose}>Cancel</button>
            </div>
        </Modal>
    )
}

export default DeleteConversationModal
