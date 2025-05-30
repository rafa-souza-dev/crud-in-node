import { z } from 'zod/v4';

import { DefaultError } from './default-error.js';

export const notfoundErrorSchema = z.object({
    name: z.literal('NotFoundError'),
    message: z.string(),
    status_code: z.literal(404),
})

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