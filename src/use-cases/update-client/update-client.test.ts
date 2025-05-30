import { beforeEach, describe, expect, it } from "vitest";

import { ClientUpdateInput } from "../../domain/client.types.js";
import { Client } from "../../domain/client.js";
import { generateUpdateClientForTests } from "./factories.js";
import { UpdateClient } from "./update-client.ts";

let useCase: UpdateClient;

beforeEach(() => {
    useCase = generateUpdateClientForTests([
        new Client({
            id: 'custom_id',
            name: 'Rafael',
            createdAt: new Date(),
            email: 'rafael@email.com',
            phone: '8888888888',
            updatedAt: new Date()
        }),
        new Client({
            id: 'custom_id_3',
            name: 'Rafael',
            createdAt: new Date(),
            email: 'rafael2@email.com',
            phone: '8888888889',
            updatedAt: new Date()
        }),
    ]);
});

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

    describe('with conflict email', () => {
        const id = 'custom_id_3';
        const data: ClientUpdateInput = {
            name: 'Juvenal',
            email: 'rafael@email.com',
            phone: '(87) 9 9999-9999'
        }

        describe('when calls update method', () => {
            it('should throw an error if client has conflict data', async () => {
                await expect(useCase.handle(id, data)).rejects.toThrow();
            });
        })
    });

    describe('with conflict phone', () => {
        const id = 'custom_id_3';
        const data: ClientUpdateInput = {
            name: 'Juvenal',
            email: 'juvenal3@email.com',
            phone: '8888888888'
        }

        describe('when calls update method', () => {
            it('should throw an error if client has conflict data', async () => {
                await expect(useCase.handle(id, data)).rejects.toThrow();
            });
        })
    });
});
