import { Client } from "../../domain/Client.js";
import { ClientCreateInput } from "../../domain/Client.types.js";
import { ClientRepository } from "../../repository/ClientRepository.js";

export class CreateClient {
    constructor(private repository: ClientRepository) { }

    async handle(data: ClientCreateInput): Promise<Client> {
        const client = await this.repository.create(data);

        return client;
    }
}
