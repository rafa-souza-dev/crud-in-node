import { Client } from "../../domain/client.js";
import { ClientNotFoundError } from "../../errors/client-not-found-error.js";
import { CacheService } from "../../infra/cache/cache-service.js";
import { ClientRepository } from "../../repositories/client-repository.js";
import { parseWithDate } from "../../utils/parse.js";

export class RetrieveClient {
    constructor(
        private repository: ClientRepository,
        private cacheService: CacheService | null = null
    ) { }

    async handle(id: string): Promise<{ client: Client }> {
        const CACHE_KEY = `client:${id}`;
        const TTL = 30;
        const cachedResult = await this.getResultFromCache(CACHE_KEY);

        if (cachedResult) {
            return { client: parseWithDate(cachedResult) }
        }

        const client = await this.repository.findById(id);

        if (!client) {
            throw new ClientNotFoundError();
        }

        await this.setInCache(CACHE_KEY, JSON.stringify(client), TTL)

        return { client };
    }

    private async getResultFromCache(key: string) {
        if (this.cacheService) {
            const cachedResult = await this.cacheService.get(key);

            return cachedResult;
        }

        return null;
    }

    private async setInCache(key: string, value: string, ttl: number) {
        if (this.cacheService) {
            await this.cacheService.set(key, value, ttl)
        }
    }
}
