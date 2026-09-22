import { useEffect, useRef, useState } from 'react'

interface ConversationMenuProps {
    onRename: () => void
    onDelete: () => void
}

// rough height of the dropdown (2 items), used to decide if it fits below the button
const ESTIMATED_DROPDOWN_HEIGHT = 90

function ConversationMenu({ onRename, onDelete }: ConversationMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [openUpward, setOpenUpward] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // closes the dropdown when clicking anywhere outside of it
    useEffect(() => {
        if (!isOpen) return

        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    function handleToggle() {
        if (!isOpen && menuRef.current) {
            const spaceBelow = window.innerHeight - menuRef.current.getBoundingClientRect().bottom
            setOpenUpward(spaceBelow < ESTIMATED_DROPDOWN_HEIGHT)
        }
        setIsOpen((prev) => !prev)
    }

    return (
        <div className="conversation-menu" ref={menuRef}>
            <button
                type="button"
                className="conversation-menu-button"
                aria-label="Conversation options"
                onClick={handleToggle}
            >
                ⋮
            </button>

            {isOpen && (
                <div className={`conversation-menu-dropdown ${openUpward ? 'conversation-menu-dropdown-up' : ''}`}>
                    <button type="button" onClick={() => { setIsOpen(false); onRename() }}>
                        Rename
                    </button>
                    <button type="button" onClick={() => { setIsOpen(false); onDelete() }}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default ConversationMenu
