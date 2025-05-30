import { DefaultError } from './default-error.ts';

type NotFoundErrorProps = {
    message: string
}

export class NotFoundError extends DefaultError {
    constructor({ message }: NotFoundErrorProps) {
        super({
            message,
            name: 'NotFoundError',
            statusCode: 404,
        })
    }
}