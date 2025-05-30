import { Client } from "../../domain/client.js";
import { CacheService } from "../../infra/cache/cache-service.js";
import { ClientRepository } from "../../repositories/client-repository.js";
import { parseWithDate } from "../../utils/parse.js";

export class ListClients {
    constructor(
        private repository: ClientRepository,
        private cacheService: CacheService | null = null
    ) { }

    async handle(): Promise<{ clients: Client[] }> {
        const CACHE_KEY = 'clients';
        const TTL = 30;
        const cachedResult = await this.getResultFromCache(CACHE_KEY);

        if (cachedResult) {
            return { clients: parseWithDate(cachedResult) }
        }

        const clients = await this.repository.findAll();

        await this.setInCache(CACHE_KEY, JSON.stringify(clients), TTL)

        return { clients };
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
