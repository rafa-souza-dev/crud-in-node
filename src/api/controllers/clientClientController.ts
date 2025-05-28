import { Request, Response } from 'express';

export const createClientController = (_: Request, res: Response) => {
    res.status(201).json();
};
