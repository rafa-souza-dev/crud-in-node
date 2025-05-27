import { describe, expect, it } from "vitest";

import { InMemoryClientRepository } from "../../repository/InMemoryClientRepository.js";
import { Client } from "../../domain/Client.js";
import { RetrieveClient } from "./RetrieveClient.js";

const repository = new InMemoryClientRepository([new Client({
    id: 1,
    name: 'Rafael',
    createdAt: new Date(),
    email: 'rafael@email.com',
    phone: '8888888888',
    updatedAt: new Date()
})]);
const useCase = new RetrieveClient(repository);

describe('RetrieveClient use case', () => {
    describe('with existing client', () => {
        const id = 1;

        describe('when calls retrieve method', () => {
            it('should be able retrieve client with success', async () => {
                const { client } = await useCase.handle(id);

                expect(client.id).toBe(id)
            })
        })
    })

    describe('without existing client', () => {
        const id = 2;

        describe('when calls retrieve method', () => {
            it('should throw an error if client not found', async () => {
                await expect(useCase.handle(id)).rejects.toThrow();
            });
        })
    })
});
