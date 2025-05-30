import { Client } from "../../domain/client.js";
import { InMemoryClientRepository } from "../../repository/in-memory-client-repository.js";
import { MongoClientRepository } from "../../repository/mongo-db-client-repository.js";
import { CreateClient } from "./create-client.js";

export function generateCreateClientForTests(baseData: Client[] = []) {
    const repository = new InMemoryClientRepository(baseData);

    return new CreateClient(repository);
}

export function generateCreateClientDefault() {
    const repository = MongoClientRepository.getInstance();

    return new CreateClient(repository);
}
