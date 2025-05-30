import { z } from 'zod/v4';
import { DefaultError } from './default-error.ts';

export const internalServerErrorSchema = z.object({
    name: z.literal('InternalServerError'),
    message: z.literal('An internal server error occurred.'),
    status_code: z.literal(500),
})

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
