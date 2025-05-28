import { Request, Response } from 'express';

import { Client } from '../../domain/Client.js';
import { generateRetrieveClientDefault } from '../../use-cases/retrieve-client/factories.js';

export const retrieveClientController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { client } = await generateRetrieveClientDefault().handle(id);

    res.status(200).json({ client: Client.serialize(client) });
};
