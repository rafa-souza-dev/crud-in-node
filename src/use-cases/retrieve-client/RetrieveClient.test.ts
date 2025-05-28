import { describe, expect, it } from "vitest";

import { Client } from "../../domain/Client.js";
import { generateRetrieveClientForTests } from "./factories.js";

const useCase = generateRetrieveClientForTests([new Client({
    id: 'custom_id',
    name: 'Rafael',
    createdAt: new Date(),
    email: 'rafael@email.com',
    phone: '8888888888',
    updatedAt: new Date()
})]);

describe('RetrieveClient use case', () => {
    describe('with existing client', () => {
        const id = 'custom_id';

        describe('when calls retrieve method', () => {
            it('should be able retrieve client with success', async () => {
                const { client } = await useCase.handle(id);

                expect(client.id).toBe(id)
            })
        })
    })

    describe('without existing client', () => {
        const id = 'custom_id_2';

        describe('when calls retrieve method', () => {
            it('should throw an error if client not found', async () => {
                await expect(useCase.handle(id)).rejects.toThrow();
            });
        })
    })
});
