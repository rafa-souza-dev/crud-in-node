import { Client } from "../../domain/client.js";
import { ClientCreateInput } from "../../domain/client.types.js";
import { ClientRepository } from "../../repositories/client-repository.js";

export class CreateClient {
    constructor(private repository: ClientRepository) { }

    async handle(data: ClientCreateInput): Promise<{ client: Client }> {
        const client = await this.repository.create(data);

        return { client };
    }
}
