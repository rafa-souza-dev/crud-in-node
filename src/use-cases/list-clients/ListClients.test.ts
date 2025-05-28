import { describe, expect, it } from "vitest";

import { InMemoryClientRepository } from "../../repository/InMemoryClientRepository.js";
import { Client } from "../../domain/Client.js";
import { ListClients } from "./ListClients.js";

const repository = new InMemoryClientRepository([
    new Client({
        id: 'custom_id',
        name: 'Rafael',
        createdAt: new Date(),
        email: 'rafael@email.com',
        phone: '8888888888',
        updatedAt: new Date()
    }),
    new Client({
        id: 'custom_id_2',
        name: 'Juvenal',
        createdAt: new Date(),
        email: 'juvenal@email.com',
        phone: '8888888888',
        updatedAt: new Date()
    })
]);
const useCase = new ListClients(repository);

describe('ListClients use case', () => {
    it('should be able to list registered clients', async () => {
        const { clients } = await useCase.handle();

        expect(clients.length).toBe(2)
        expect(clients[0].id).toBe('custom_id')
        expect(clients[1].id).toBe('custom_id_2')
    })
});
