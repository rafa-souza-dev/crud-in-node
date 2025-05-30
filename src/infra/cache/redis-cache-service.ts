import { Redis } from 'ioredis';

import { CacheService } from './cache-service.ts';

const redisHost = process.env.REDIS_HOST ?? 'redis'
const redisPort = Number(process.env.REDIS_PORT ?? 6379)

export class RedisCacheService implements CacheService {
    private static instance: RedisCacheService | null = null;
    private redis: Redis;

    private constructor(host = redisHost, port = redisPort) {
        this.redis = new Redis({
            host,
            port,
        });
    }

    public static getInstance(host = redisHost, port = redisPort): RedisCacheService {
        if (!RedisCacheService.instance) {
            RedisCacheService.instance = new RedisCacheService(host, port);
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
