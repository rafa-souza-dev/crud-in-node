import { describe, expect, it } from "vitest";

import { Client } from "../../domain/Client.js";
import { generateListClientsForTests } from "./factories.js";

const useCase = generateListClientsForTests([
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

describe('ListClients use case', () => {
    it('should be able to list registered clients', async () => {
        const { clients } = await useCase.handle();

        expect(clients.length).toBe(2)
        expect(clients[0].id).toBe('custom_id')
        expect(clients[1].id).toBe('custom_id_2')
    })
});
