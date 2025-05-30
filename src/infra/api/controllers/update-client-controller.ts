import { Request, Response } from 'express';
import { z } from "zod/v4";

import { generateUpdateClientDefault } from '../../../use-cases/update-client/factories.js';
import { Client } from '../../../domain/client.js';
import { ValidationError } from '../../../errors/validation-error.js';

export const updateClientController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const clientUpdateSchema = z.object({
        client: z.object({
            name: z.string().min(1, 'Nome é obrigatório'),
            email: z.email('Email inválido'),
            phone: z.string().regex(
                /^(\+?[1-9]\d{1,14}|\(\d{2}\) \d{5}-\d{4})$/,
                'Telefone inválido. Use o formato internacional ou (99) 99999-9999'
            )
        })
    });
    const result = clientUpdateSchema.safeParse(req.body);

    if (!result.success) {
        const details = result.error.issues.map(issue => issue.message);

        throw new ValidationError({ message: 'Input inválido', details });
    }

    const { client } = await generateUpdateClientDefault().handle(id, result.data.client);

    res.status(200).json({ client: Client.serialize(client) });
};
