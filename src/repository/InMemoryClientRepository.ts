import { Client } from "../domain/Client.js";
import { ClientCreateInput, ClientUpdateInput } from "../domain/Client.types.js";
import { ClientRepository } from "./ClientRepository.js";

export class InMemoryClientRepository implements ClientRepository {
    constructor(private store: Client[]) { }

    async create({ name, email, phone }: ClientCreateInput): Promise<Client> {
        const id = this.store.length + 1;
        const client = new Client({
            id, createdAt: new Date(), updatedAt: new Date(), name, email, phone
        });
        this.store.push(client);

        return client
    }

    async update(id: number, data: ClientUpdateInput): Promise<Client> {
        const client = this.store.find((client: Client) => client.id === id)!;

        client.name = data.name ?? client.name;
        client.email = data.email ?? client.email;
        client.phone = data.phone ?? client.phone;

        return client
    }

    async findById(id: number): Promise<Client | null> {
        return this.store.find((client) => client.id === id) || null;
    }

    async findAll(): Promise<Client[]> {
        return this.store;
    }
}
