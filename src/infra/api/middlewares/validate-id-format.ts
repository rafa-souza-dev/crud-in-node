import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export function validateIdFormat(req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(422).json({ message: 'Id está no formato inválido', error: true });
        return;
    }

    next();
}
