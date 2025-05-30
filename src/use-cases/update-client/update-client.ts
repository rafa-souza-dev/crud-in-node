import { Client } from "../../domain/client.js";
import { ClientUpdateInput } from "../../domain/client.types.js";
import { ConflictError } from "../../errors/conflict-error.ts";
import { ClientRepository } from "../../repositories/client-repository.js";
import { RetrieveClient } from "../retrieve-client/retrieve-client.js";

export class UpdateClient {
    constructor(private repository: ClientRepository) { }

    async handle(id: string, data: ClientUpdateInput): Promise<{ client: Client }> {
        await new RetrieveClient(this.repository).handle(id);
        const foundClient = await this.repository.findByEmailOrPhone(data.email, data.phone);

        if (foundClient && foundClient.id !== id) {
            throw new ConflictError({ message: 'Cliente com esse mesmo número de telefone e/ou e-mail já está cadastrado' });
        }

        const client = await this.repository.update(id, data)

        return { client };
    }
}
