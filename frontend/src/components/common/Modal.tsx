import type { MouseEvent, ReactNode } from 'react'

function Modal({ onClose, children }: { onClose: () => void, children: ReactNode }) {
    function stopClose(e: MouseEvent) {
        e.stopPropagation()
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={stopClose}>
                {children}
            </div>
        </div>
    )
}

export default Modal
