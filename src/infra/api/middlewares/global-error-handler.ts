import { Request, Response, NextFunction } from 'express';

import { DefaultError } from '../../../errors/default-error.js';
import { InternalServerError } from '../../../errors/internal-server-error.js';

export function globalErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(err.stack);

    if (err instanceof DefaultError) {
        const errorResponse = err.toResponse();

        res.status(errorResponse.status_code).send(errorResponse);

        return;
    }

    const internalError = new InternalServerError({ cause: err })
    const internalErrorResponse = internalError.toResponse()
    console.error(internalError)

    res.status(internalErrorResponse.status_code).send(internalErrorResponse);
}
