import { AuthorizationError, NotFoundError, PostgresError, ValidationError } from './customErrors.js';
function unknownEndpoint(req, res) {
    res.status(404).send({ error: 'unknown endpoint' });
}
function errorHandler(error, req, res, next) {
    console.error(error.message);
    if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message });
        return;
    }
    else if (error instanceof ValidationError) {
        res.status(400).json({ error: error.message });
        return;
    }
    else if (error instanceof AuthorizationError) {
        res.status(403).json({ error: error.message });
        return;
    }
    else if (error instanceof PostgresError) {
        res.status(407).json({ error: error.message });
        return;
    }
    next(error);
}
export default {
    unknownEndpoint,
    errorHandler
};
//# sourceMappingURL=middleware.js.map