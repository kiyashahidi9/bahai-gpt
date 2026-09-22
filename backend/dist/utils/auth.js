import jwt from 'jsonwebtoken';
import config from './config.js';
import { AuthorizationError } from './customErrors.js';
function getTokenFromHeader(req) {
    const authHeader = req.get('Authorization');
    if (!authHeader?.toLowerCase().startsWith('bearer ')) {
        return null;
    }
    return authHeader.substring(7);
}
export function requireAuth(req, res, next) {
    const token = getTokenFromHeader(req);
    if (!token) {
        throw new AuthorizationError('Authentication required');
    }
    if (!config.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = { id: decoded.id, username: decoded.username };
        next();
    }
    catch {
        throw new AuthorizationError('Invalid or expired token');
    }
}
//# sourceMappingURL=auth.js.map