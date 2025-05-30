import { Client } from "../../domain/client.js";
import { RedisCacheService } from "../../infra/cache/redis-cache-service.js";
import { InMemoryClientRepository } from "../../repositories/in-memory-client-repository.js";
import { MongoClientRepository } from "../../repositories/mongo-db-client-repository.js";
import { ListClients } from "./list-clients.js";

export function generateListClientsForTests(baseData: Client[] = []) {
    const repository = new InMemoryClientRepository(baseData);

    return new ListClients(repository);
}

export function generateListClientsDefault() {
    const repository = MongoClientRepository.getInstance();
    const cacheService = RedisCacheService.getInstance();

    return new ListClients(repository, cacheService);
}
