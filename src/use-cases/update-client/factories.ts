import { Client } from "../../domain/client.js";
import { InMemoryClientRepository } from "../../repositories/in-memory-client-repository.js";
import { MongoClientRepository } from "../../repositories/mongo-db-client-repository.js";
import { UpdateClient } from "./update-client.js";

export function generateUpdateClientForTests(baseData: Client[] = []) {
    const repository = new InMemoryClientRepository(baseData);

    return new UpdateClient(repository);
}

export function generateUpdateClientDefault() {
    const repository = MongoClientRepository.getInstance();

    return new UpdateClient(repository);
}
