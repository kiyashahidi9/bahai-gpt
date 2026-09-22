import pool from '../db/chatPool.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../utils/config.js'
import queries from './queries.js'

import { type User } from '../types/types.js'
import { ValidationError } from '../utils/customErrors.js'

const SALT_ROUNDS = 10

export async function hashPassword(
    password: string
): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(
    password: string,
    passwordHash: string
): Promise<boolean> {
    return bcrypt.compare(password, passwordHash)
}

export async function userExists(
    username: string
): Promise<boolean> {
    const userExists = await pool.query(
        queries.USER_EXISTS, 
        [username]
    )

    return userExists.rows.length > 0
}

export async function createUser(
    username: string,
    password: string
): Promise<User> {

    if (await userExists(username)) {
        throw new ValidationError('Username already exists')
    }

    const passwordHash = await hashPassword(password)
    const createdUser = await pool.query(
        queries.CREATE_NEW_USER, 
        [username, passwordHash]
    )
    return createdUser.rows[0]
}

export async function findUserByUsername(
    username: string
): Promise<User> {
    const user = await pool.query(
        queries.GET_USER, 
        [username]
    )

    if (!user.rows[0]) {
        throw new ValidationError('Invalid username or password')
    }

    return user.rows[0]
}

export function createToken(
    user: Pick<User, 'id' | 'username'>
): string {
    const secret = config.JWT_SECRET

    if (!secret) {
        throw new Error('JWT_SECRET must be defined')
    }

    const payload = {
        id: user.id,
        username: user.username,
    }
    const expiresIn = config.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']
    const signOptions = { expiresIn } as jwt.SignOptions

    return jwt.sign(payload, secret, signOptions)
}