import { Client } from "../../domain/client.js";
import { ClientUpdateInput } from "../../domain/client.types.js";
import { ClientRepository } from "../../repository/client-repository.js";
import { RetrieveClient } from "../retrieve-client/retrieve-client.js";

export class UpdateClient {
    constructor(private repository: ClientRepository) { }

    async handle(id: string, data: ClientUpdateInput): Promise<{ client: Client }> {
        await new RetrieveClient(this.repository).handle(id);

        const client = await this.repository.update(id, data)

        return { client };
    }
}
