import { Client } from "../domain/Client.js";
import { ClientCreateInput, ClientUpdateInput } from "../domain/Client.types.js";

export interface ClientRepository {
    create: (data: ClientCreateInput) => Client;
    update: (data: ClientUpdateInput) => Client;
    findById: (id: number) => Client | null;
    findAll: () => Client[];
}
