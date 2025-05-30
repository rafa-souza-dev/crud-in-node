import { Request, Response } from 'express';

import { generateRetrieveClientDefault } from '../../../use-cases/retrieve-client/factories.ts';
import { Client } from '../../../domain/client.ts';

export const retrieveClientController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { client } = await generateRetrieveClientDefault().handle(id);

    res.status(200).json({ client: Client.serialize(client) });
};
