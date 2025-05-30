import { describe, expect, it } from "vitest";

import { ClientCreateInput } from "../../domain/client.types.js";
import { generateCreateClientForTests } from "./factories.js";
import { generateListClientsForTests } from "../list-clients/factories.js";
import { Client } from "../../domain/client.js";

const baseData: Client[] = [];
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

                expect((clients).length).toBe(1)
                expect((clients[0]).name).toBe(data.name)
                expect((clients[0]).email).toBe(data.email)
                expect((clients[0]).phone).toBe(data.phone)
            })
        })
    });
});
