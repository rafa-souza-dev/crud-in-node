import { Client } from "../../domain/Client.js";
import { ClientUpdateInput } from "../../domain/Client.types.js";
import { ClientRepository } from "../../repository/ClientRepository.js";
import { RetrieveClient } from "../retrieve-client/RetrieveClient.js";

export class UpdateClient {
    constructor(private repository: ClientRepository) { }

    async handle(id: number, data: ClientUpdateInput): Promise<{ client: Client }> {
        await new RetrieveClient(this.repository).handle(id);

        const client = await this.repository.update(id, data)

        return { client };
    }
}
