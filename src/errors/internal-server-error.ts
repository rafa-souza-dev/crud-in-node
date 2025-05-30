import { DefaultError } from './default-error.ts';

type InternalServerErrorProps = {
    cause?: unknown
}

export class InternalServerError extends DefaultError {
    constructor({ cause }: InternalServerErrorProps) {
        super({
            cause,
            message: 'An internal server error occurred.',
            name: 'InternalServerError',
            statusCode: 500,
        })
    }
}
