import { Client } from "../../domain/Client.js";
import { ClientUpdateInput } from "../../domain/Client.types.js";
import { ClientNotFoundError } from "../../errors/ClientNotFoundError.js";
import { ClientRepository } from "../../repository/ClientRepository.js";

export class UpdateClient {
    constructor(private repository: ClientRepository) { }

    async handle(id: number, data: ClientUpdateInput): Promise<{ client: Client }> {
        const client = await this.repository.findById(id);

        if (!client) {
            throw new ClientNotFoundError();
        }

        const updatedClient = await this.repository.update(id, data)

        return { client: updatedClient };
    }
}
