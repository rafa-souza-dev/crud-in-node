import { describe, expect, it } from "vitest";

import { InMemoryClientRepository } from "../../repository/InMemoryClientRepository.js";
import { ClientUpdateInput } from "../../domain/Client.types.js";
import { UpdateClient } from "./UpdateClient.js";
import { Client } from "../../domain/Client.js";

const repository = new InMemoryClientRepository([new Client({
    id: 'custom_id',
    name: 'Rafael',
    createdAt: new Date(),
    email: 'rafael@email.com',
    phone: '8888888888',
    updatedAt: new Date()
})]);
const useCase = new UpdateClient(repository);

describe('UpdateClient use case', () => {
    describe('with valid data', () => {
        const data: ClientUpdateInput = {
            name: 'Juvenal',
            email: 'juvenal@email.com',
            phone: '(87) 9 9999-9999'
        }

        describe('with existing client', () => {
            const id = 'custom_id';

            describe('when calls update method', () => {
                it('should be able update client with success', async () => {
                    const { client } = await useCase.handle(id, data);

                    expect(client.id).toBe(id)
                    expect(client.name).toBe(data.name)
                    expect(client.email).toBe(data.email)
                    expect(client.phone).toBe(data.phone)
                })
            })
        })

        describe('without existing client', () => {
            const id = 'custom_id_2';

            describe('when calls update method', () => {
                it('should throw an error if client not found', async () => {
                    await expect(useCase.handle(id, data)).rejects.toThrow();
                });
            })
        })
    });
});
