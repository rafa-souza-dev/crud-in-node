import { describe, expect, it } from "vitest";

import { ClientCreateInput } from "../../domain/client.types.js";
import { generateCreateClientForTests } from "./factories.js";
import { generateListClientsForTests } from "../list-clients/factories.js";
import { Client } from "../../domain/client.js";

const baseData: Client[] = [
    new Client({
        id: 'custom_id',
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'juvenal2@email.com',
        name: 'Juvenal',
        phone: '(87) 9 9999-8888',
    })
];
const useCase = generateCreateClientForTests(baseData);

describe('CreateClient use case', () => {
    describe('with valid data', () => {
        const data: ClientCreateInput = {
            name: 'Juvenal',
            email: 'juvenal@email.com',
            phone: '(87) 9 9999-9999'
        }

        describe('when calls create method', () => {
            it('should be able create client with success', async () => {
                await useCase.handle(data);
                const { clients } = await generateListClientsForTests(baseData).handle();

                expect((clients).length).toBe(2)
                expect((clients[1]).name).toBe(data.name)
                expect((clients[1]).email).toBe(data.email)
                expect((clients[1]).phone).toBe(data.phone)
            })
        })
    });

    describe('with conflict email', () => {
        const data: ClientCreateInput = {
            name: 'Juvenal',
            email: 'juvenal2@email.com',
            phone: '(87) 9 9999-9999'
        }

        describe('when calls create method', () => {
            it('should throw an error if client has conflict data', async () => {
                await expect(useCase.handle(data)).rejects.toThrow();
            });
        })
    });

    describe('with conflict phone', () => {
        const data: ClientCreateInput = {
            name: 'Juvenal',
            email: 'juvenal3@email.com',
            phone: '(87) 9 9999-8888'
        }

        describe('when calls create method', () => {
            it('should throw an error if client has conflict data', async () => {
                await expect(useCase.handle(data)).rejects.toThrow();
            });
        })
    });
});
