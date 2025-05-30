import { z } from "zod/v4";

import { DefaultError } from "./default-error.ts";

export const validationErrorSchema = z.object({
    name: z.literal('ValidationError'),
    message: z.string(),
    status_code: z.literal(422),
    details: z.array(z.any()),
})

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
