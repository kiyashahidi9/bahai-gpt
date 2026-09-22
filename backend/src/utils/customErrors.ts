export class NotFoundError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "NotFoundError"
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "ValidationError"
    }
}

export class AuthorizationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "AuthorizationError"
    }
}

export class PostgresError extends Error {
    constructor(message:string) {
        super(message)
        this.name = "PostgresError"
    }
}

export class LLMError extends Error {
    constructor(message:string) {
        super(message)
        this.name = "LLMError"
    }
}