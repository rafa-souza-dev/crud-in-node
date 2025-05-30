import { Client } from "../../domain/client.js";
import { RedisCacheService } from "../../infra/cache/redis-cache-service.js";
import { InMemoryClientRepository } from "../../repository/in-memory-client-repository.js";
import { MongoClientRepository } from "../../repository/mongo-db-client-repository.js";
import { RetrieveClient } from "./retrieve-client.js";

export function generateRetrieveClientForTests(baseData: Client[] = []) {
    const repository = new InMemoryClientRepository(baseData);

    return new RetrieveClient(repository);
}

export function generateRetrieveClientDefault() {
    const repository = MongoClientRepository.getInstance();
    const cacheService = RedisCacheService.getInstance();

    return new RetrieveClient(repository, cacheService);
}
