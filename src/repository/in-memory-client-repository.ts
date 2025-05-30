import { randomUUID } from "node:crypto";

import { Client } from "../domain/client.js";
import { ClientCreateInput, ClientUpdateInput } from "../domain/client.types.js";
import { ClientRepository } from "./client-repository.js";

export class InMemoryClientRepository implements ClientRepository {
    constructor(private store: Client[]) { }

    async create({ name, email, phone }: ClientCreateInput): Promise<Client> {
        const id = randomUUID();
        const client = new Client({
            id, createdAt: new Date(), updatedAt: new Date(), name, email, phone
        });
        this.store.push(client);

        return client
    }

    async update(id: string, data: ClientUpdateInput): Promise<Client> {
        const client = this.store.find((client: Client) => client.id === id)!;

        client.name = data.name ?? client.name;
        client.email = data.email ?? client.email;
        client.phone = data.phone ?? client.phone;

        return client
    }

    async findById(id: string): Promise<Client | null> {
        return this.store.find((client) => client.id === id) || null;
    }

    async findAll(): Promise<Client[]> {
        return this.store;
    }
}
