import { describe, expect, it } from "vitest";

import { ClientProps } from "./client.types.ts";
import { Client } from "./client.ts";

describe('Client class', () => {
    describe('with valid props', () => {
        const props: ClientProps = {
            id: 'custom_id',
            createdAt: new Date(),
            updatedAt: new Date(),
            email: 'juvenal@email.com',
            name: 'Juvenal',
            phone: '123'
        }

        describe('when create a client instance', () => {
            it('should be able to create a client', () => {
                const newClient = new Client(props);

                expect(newClient.id).toBe(props.id);
                expect(Boolean(newClient.createdAt)).toBe(true);
                expect(Boolean(newClient.updatedAt)).toBe(true);
            })
        })

        describe('when update a client instance', () => {
            it('should be able to update a client', async () => {
                const newClient = new Client(props);
                const oldUpdatedAt = newClient.updatedAt;

                await new Promise((res, _) => setTimeout(res, 100))

                newClient.id = 'custom_id_2'

                expect(newClient.id).toBe('custom_id_2');
                expect(Boolean(newClient.createdAt)).toBe(true);
                expect(oldUpdatedAt < newClient.updatedAt).toBe(true);
            })
        })
    })
})