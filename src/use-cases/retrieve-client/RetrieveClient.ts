import { Client } from "../../domain/Client.js";
import { ClientNotFoundError } from "../../errors/ClientNotFoundError.js";
import { ClientRepository } from "../../repository/ClientRepository.js";

export class RetrieveClient {
    constructor(private repository: ClientRepository) { }

    async handle(id: string): Promise<{ client: Client }> {
        const client = await this.repository.findById(id);

        if (!client) {
            throw new ClientNotFoundError();
        }

        return { client };
    }
}
