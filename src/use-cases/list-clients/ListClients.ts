import { Client } from "../../domain/Client.js";
import { ClientRepository } from "../../repository/ClientRepository.js";

export class ListClients {
    constructor(private repository: ClientRepository) { }

    async handle(): Promise<{ clients: Client[] }> {
        const clients = await this.repository.findAll();

        return { clients };
    }
}
