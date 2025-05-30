import { DefaultError } from './default-error.ts';

type ConflictErrorProps = {
    message: string
}

export class ConflictError extends DefaultError {
    constructor({ message }: ConflictErrorProps) {
        super({
            message,
            name: 'ConflictError',
            statusCode: 409,
        })
    }
}
