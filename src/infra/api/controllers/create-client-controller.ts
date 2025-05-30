import { Request, Response } from 'express';
import { z } from "zod/v4";

import { generateCreateClientDefault } from '../../../use-cases/create-client/factories.js';
import { Client } from '../../../domain/client.js';

export const createClientController = async (req: Request, res: Response) => {
    const clientCreateSchema = z.object({
        client: z.object({
            name: z.string().min(1, 'Nome é obrigatório'),
            email: z.email('Email inválido'),
            phone: z.string().regex(
                /^(\+?[1-9]\d{1,14}|\(\d{2}\) \d{5}-\d{4})$/,
                'Telefone inválido. Use o formato internacional ou (99) 99999-9999'
            )
        })
    });
    const data = clientCreateSchema.parse(req.body);
    const { client } = await generateCreateClientDefault().handle(data.client);

    res.status(201).json({ client: Client.serialize(client) });
};
