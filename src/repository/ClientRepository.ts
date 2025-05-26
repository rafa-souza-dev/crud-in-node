import { Client } from "../domain/Client.js";
import { ClientCreateInput, ClientUpdateInput } from "../domain/Client.types.js";

export interface ClientRepository {
    create: (data: ClientCreateInput) => Promise<Client>;
    update: (data: ClientUpdateInput) => Promise<Client>;
    findById: (id: number) => Promise<Client | null>;
    findAll: () => Promise<Client[]>;
}
