import { Request, Response, NextFunction } from 'express';

import { DefaultError } from '../../../errors/default-error.ts';
import { InternalServerError } from '../../../errors/internal-server-error.ts';
import { logger } from '../../logger/index.ts';

export function globalErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    logger.error(err.stack);

    if (err instanceof DefaultError) {
        const errorResponse = err.toResponse();

        res.status(errorResponse.status_code).send(errorResponse);

        return;
    }

    const internalError = new InternalServerError({ cause: err })
    const internalErrorResponse = internalError.toResponse()
    logger.error(internalError)

    res.status(internalErrorResponse.status_code).send(internalErrorResponse);
}
