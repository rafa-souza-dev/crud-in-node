import { describe, expect, it } from "vitest";

import { BaseEntityProps } from "./base-entity.types.js";
import { BaseEntity } from "./base-entity.js";

describe('BaseEntity class', () => {
    describe('with valid props', () => {
        const props: BaseEntityProps = {
            id: 'custom_id',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        describe('when create a base-entity instance', () => {
            it('should be able to create a entity', () => {
                const newEntity = new BaseEntity(props);

                expect(newEntity.id).toBe(props.id);
                expect(Boolean(newEntity.createdAt)).toBe(true);
                expect(Boolean(newEntity.updatedAt)).toBe(true);
            })
        })

        describe('when update a base-entity instance', () => {
            it('should be able to update a entity', async () => {
                const newEntity = new BaseEntity(props);
                const oldUpdatedAt = newEntity.updatedAt;

                await new Promise((res, _) => setTimeout(res, 100))

                newEntity.id = 'custom_id_2'

                expect(newEntity.id).toBe('custom_id_2');
                expect(Boolean(newEntity.createdAt)).toBe(true);
                expect(oldUpdatedAt < newEntity.updatedAt).toBe(true);
            })
        })
    })
})