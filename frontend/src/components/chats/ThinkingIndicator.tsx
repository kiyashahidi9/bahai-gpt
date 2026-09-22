import { useState, useEffect } from 'react'
import { THINKING_MESSAGES } from '../../constants/thinkingMessages'

const WORD_INTERVAL_MS = 3200
const DOT_INTERVAL_MS = 400
const MAX_DOTS = 3

function ThinkingIndicator() {
    const [wordIndex, setWordIndex] = useState(0)
    const [dotCount, setDotCount] = useState(1)

    useEffect(() => {
        const wordTimer = setInterval(() => {
            setWordIndex((i) => (i + 1) % THINKING_MESSAGES.length)
        }, WORD_INTERVAL_MS)
        return () => clearInterval(wordTimer)
    }, [])

    useEffect(() => {
        const dotTimer = setInterval(() => {
            setDotCount((d) => (d % MAX_DOTS) + 1)
        }, DOT_INTERVAL_MS)
        return () => clearInterval(dotTimer)
    }, [])

    return (
        <div className="chat-message chat-message-assistant">
            <div className="chat-message-bubble chat-thinking">
                <span>{THINKING_MESSAGES[wordIndex]}</span>
                <span className="chat-thinking-dots">{'.'.repeat(dotCount)}</span>
            </div>
        </div>
    )
}

export default ThinkingIndicator
