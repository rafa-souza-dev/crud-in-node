import { Client } from "../domain/client.js";
import { ClientCreateInput, ClientUpdateInput } from "../domain/client.types.js";

export interface ClientRepository {
    create: (data: ClientCreateInput) => Promise<Client>;
    update: (id: string, data: ClientUpdateInput) => Promise<Client>;
    findById: (id: string) => Promise<Client | null>;
    findAll: () => Promise<Client[]>;
}
