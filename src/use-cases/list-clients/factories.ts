import { Client } from "../../domain/Client.js";
import { RedisCacheService } from "../../infra/cache/RedisCacheService.js";
import { InMemoryClientRepository } from "../../repository/InMemoryClientRepository.js";
import { MongoClientRepository } from "../../repository/MongoDBClientRepository.js";
import { ListClients } from "./ListClients.js";

export function generateListClientsForTests(baseData: Client[] = []) {
    const repository = new InMemoryClientRepository(baseData);

    return new ListClients(repository);
}

export function generateListClientsDefault() {
    const repository = MongoClientRepository.getInstance();
    const cacheService = RedisCacheService.getInstance();

    return new ListClients(repository, cacheService);
}
