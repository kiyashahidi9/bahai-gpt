import express from 'express'
import {
    registerNewUser,
    loginUser
} from '../controllers/authControllers.js'

const authRouter = express.Router()

authRouter.post('/register', registerNewUser)
authRouter.post('/login', loginUser)

export default authRouter