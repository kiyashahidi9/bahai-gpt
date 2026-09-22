import { ValidationError } from "../utils/customErrors.js";
import { createUser, createToken, findUserByUsername, verifyPassword, } from '../models/users.js';
export async function registerNewUser(req, res) {
    const { username, password } = req.body;
    const createdUser = await createUser(username, password);
    res.status(201).json({
        user: {
            id: createdUser.id,
            username: createdUser.username,
        }
    });
}
export async function loginUser(req, res) {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
        throw new ValidationError('Invalid username or password');
    }
    const token = createToken({
        id: user.id,
        username: user.username,
    });
    res.json({
        token,
        user: {
            id: user.id,
            username: user.username,
        },
    });
}
//# sourceMappingURL=authControllers.js.map