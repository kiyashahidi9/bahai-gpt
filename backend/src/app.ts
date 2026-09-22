import express from 'express'
import cors from 'cors'

// ROUTERS
import authRouter from './routes/authRouter.js'
import chatRouter from './routes/chatRouter.js'
import llmRouter from './routes/llmRouter.js'

// MIDDLEWARE
import middleware from './utils/middleware.js'
import { requireAuth } from './utils/auth.js'

const app = express()

// USING MIDDLEWARE AND ROUTERS
//app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/conversations', requireAuth, chatRouter)
app.use('/api/llm', requireAuth, llmRouter)

// UNKNOWN API ENDPOINT
app.use('/api', middleware.unknownEndpoint)

// FRONTEND
app.use(express.static('frontendDist'))
app.get('/{*splat}', (req, res) => {
    res.redirect('/')
})

// ERROR HANDLING
app.use(middleware.errorHandler)

export default app