import { DefaultError } from "./default-error.ts";

type ValidationErrorProps = {
    message: string
    details?: unknown
    cause?: unknown
}

export class ValidationError extends DefaultError {
    constructor({ message, details, cause }: ValidationErrorProps) {
        super({
            cause,
            details,
            message,
            name: 'ValidationError',
            statusCode: 422,
        })
    }
}
