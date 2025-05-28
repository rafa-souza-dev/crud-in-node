import { Client } from "../../domain/Client.js";
import { InMemoryClientRepository } from "../../repository/InMemoryClientRepository.js";
import { MongoClientRepository } from "../../repository/MongoDBClientRepository.js";
import { CreateClient } from "./CreateClient.js";

export function generateCreateClientForTests(baseData: Client[] = []) {
    const repository = new InMemoryClientRepository(baseData);

    return new CreateClient(repository);
}

export function generateCreateClientDefault() {
    const repository = new MongoClientRepository();

    return new CreateClient(repository);
}
