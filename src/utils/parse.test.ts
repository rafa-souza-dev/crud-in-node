import { describe, it, expect } from 'vitest';
import { parseWithDate } from './parse.js';

interface Sample1 {
    createdAt: Date;
    updatedAt: Date;
    name: string;
}

interface Sample2 {
    createdAt: string;
    finishedAt: string;
    otherAt: string;
    count: number;
}

interface NestedSample {
    user: {
        joinedAt: Date;
        profile: {
            lastLoginAt: Date;
        };
    };
}

describe('parseWithDate function', () => {
    describe('with JSON containing date strings in ISO format', () => {
        const input = {
            createdAt: '2025-05-29T10:15:30.123Z',
            updatedAt: '2024-12-31T23:59:59.999Z',
            name: 'Test',
        };
        const json = JSON.stringify(input);

        describe('when parsing the JSON string', () => {
            const result = parseWithDate(json) as unknown as Sample1;

            it('should convert properties ending with "At" into Date instances', () => {
                expect(result.createdAt).toBeInstanceOf(Date);
                expect(result.updatedAt).toBeInstanceOf(Date);
            });

            it('should preserve the correct date values', () => {
                expect(result.createdAt.toISOString()).toBe(input.createdAt);
                expect(result.updatedAt.toISOString()).toBe(input.updatedAt);
            });

            it('should leave non-date properties unchanged', () => {
                expect(result.name).toBe(input.name);
            });
        });
    });

    describe('with nested objects containing date strings', () => {
        const input = {
            user: {
                joinedAt: '2020-01-01T00:00:00.000Z',
                profile: {
                    lastLoginAt: '2025-05-28T20:20:20.020Z',
                },
            },
        };
        const json = JSON.stringify(input);

        describe('when parsing the JSON string', () => {
            const result = parseWithDate(json) as unknown as NestedSample;

            it('should convert nested date strings into Date instances', () => {
                expect(result.user.joinedAt).toBeInstanceOf(Date);
                expect(result.user.profile.lastLoginAt).toBeInstanceOf(Date);
            });

            it('should preserve nested object structure and values', () => {
                expect(result.user.joinedAt.toISOString()).toBe(input.user.joinedAt);
                expect(result.user.profile.lastLoginAt.toISOString()).toBe(
                    input.user.profile.lastLoginAt
                );
            });
        });
    });
});
