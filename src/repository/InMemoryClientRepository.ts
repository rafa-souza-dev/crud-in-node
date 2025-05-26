import { Client } from "../domain/Client.js";
import { ClientCreateInput, ClientUpdateInput } from "../domain/Client.types.js";
import { ClientRepository } from "./ClientRepository.js";

export class InMemoryClientRepository implements ClientRepository {
    constructor(private store: Client[]) { }

    async create({ name, email, phone }: ClientCreateInput): Promise<Client> {
        const id = this.store.length + 1
        const client = new Client(id, new Date(), new Date(), name, email, phone)

        return client
    }

    async update(id: number, data: ClientUpdateInput): Promise<Client> {
        const client = this.store.find((client: Client) => client.Id === id)!;

        client.UpdatedAt = new Date();
        client.Name = data.name ?? client.Name;
        client.Email = data.email ?? client.Email;
        client.Phone = data.phone ?? client.Phone;

        return client
    }

    async findById(id: number): Promise<Client | null> {
        return this.store.find((client) => client.Id === id) || null;
    }

    async findAll(): Promise<Client[]> {
        return this.store;
    }
}
