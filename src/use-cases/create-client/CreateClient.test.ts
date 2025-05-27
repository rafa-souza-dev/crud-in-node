import { describe, expect, it } from "vitest";

import { InMemoryClientRepository } from "../../repository/InMemoryClientRepository.js";
import { CreateClient } from "./CreateClient.js";
import { ClientCreateInput } from "../../domain/Client.types.js";

const repository = new InMemoryClientRepository([]);
const useCase = new CreateClient(repository);

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
                const clients = await repository.findAll();

                expect((clients).length).toBe(1)
                expect((clients[0]).name).toBe(data.name)
                expect((clients[0]).email).toBe(data.email)
                expect((clients[0]).phone).toBe(data.phone)
            })
        })
    });
});
