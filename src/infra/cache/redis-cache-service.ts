import { Redis } from 'ioredis';

import { CacheService } from './cache-service.js';

export class RedisCacheService implements CacheService {
    private static instance: RedisCacheService | null = null;
    private redis: Redis;

    private constructor(redisHost = 'localhost', redisPort = 6379) {
        this.redis = new Redis({
            host: redisHost,
            port: redisPort,
        });
    }

    public static getInstance(redisHost = 'localhost', redisPort = 6379): RedisCacheService {
        if (!RedisCacheService.instance) {
            RedisCacheService.instance = new RedisCacheService(redisHost, redisPort);
        }
        return RedisCacheService.instance;
    }

    async get(key: string): Promise<string | null> {
        return await this.redis.get(key);
    }

    async set(key: string, value: string, ttl: number): Promise<void> {
        await this.redis.set(key, value, 'EX', ttl);
    }
}
