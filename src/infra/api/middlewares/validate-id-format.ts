import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import { ValidationError } from '../../../errors/validation-error.ts';

export function validateIdFormat(req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ValidationError({ message: 'Id está no formato inválido' })
    }

    next();
}
