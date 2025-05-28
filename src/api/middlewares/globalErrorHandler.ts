import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import { ClientNotFoundError } from '../../errors/ClientNotFoundError.js';

export function globalErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(err.stack);

    if (err instanceof ClientNotFoundError) {
        res.status(404).json({
            message: err.message,
            error: err,
        });
        return;
    }

    if (err instanceof ZodError) {
        res.status(422).json({
            message: 'Validation Error',
            error: err.errors?.[0],
        });
        return;
    }

    res.status(500).json({
        message: 'Internal Server Error',
        error: err,
    });
}
