import { Request, Response, NextFunction } from 'express';

export function globalErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(err.stack);

    if (err.name === 'ClientNotFoundError') {
        res.status(404).json({
            message: err.message,
            error: err,
        });
        return;
    }

    if (err.name === 'ZodError') {
        res.status(422).json({
            message: 'Validation Error',
            error: err,
        });
        return;
    }

    res.status(500).json({
        message: 'Internal Server Error',
        error: err,
    });
}
