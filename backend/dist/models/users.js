import pool from '../db/chatPool.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../utils/config.js';
import queries from './queries.js';
import {} from '../types/types.js';
import { ValidationError } from '../utils/customErrors.js';
const SALT_ROUNDS = 10;
export async function hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}
export async function verifyPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}
export async function userExists(username) {
    const userExists = await pool.query(queries.USER_EXISTS, [username]);
    return userExists.rows.length > 0;
}
export async function createUser(username, password) {
    if (await userExists(username)) {
        throw new ValidationError('Username already exists');
    }
    const passwordHash = await hashPassword(password);
    const createdUser = await pool.query(queries.CREATE_NEW_USER, [username, passwordHash]);
    return createdUser.rows[0];
}
export async function findUserByUsername(username) {
    const user = await pool.query(queries.GET_USER, [username]);
    if (!user.rows[0]) {
        throw new ValidationError('Invalid username or password');
    }
    return user.rows[0];
}
export function createToken(user) {
    const secret = config.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET must be defined');
    }
    const payload = {
        id: user.id,
        username: user.username,
    };
    const expiresIn = config.JWT_EXPIRES_IN;
    const signOptions = { expiresIn };
    return jwt.sign(payload, secret, signOptions);
}
//# sourceMappingURL=users.js.map