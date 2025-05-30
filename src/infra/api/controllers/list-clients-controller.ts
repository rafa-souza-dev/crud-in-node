import { Request, Response } from 'express';

import { generateListClientsDefault } from '../../../use-cases/list-clients/factories.ts';
import { Client } from '../../../domain/client.ts';

export const listClientsController = async (_: Request, res: Response) => {
    const { clients } = await generateListClientsDefault().handle();

    res.status(200).json({ clients: Client.serializeAll(clients) });
};
