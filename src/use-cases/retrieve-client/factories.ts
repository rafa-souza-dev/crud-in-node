import { Client } from "../../domain/Client.js";
import { InMemoryClientRepository } from "../../repository/InMemoryClientRepository.js";
import { MongoClientRepository } from "../../repository/MongoDBClientRepository.js";
import { RetrieveClient } from "./RetrieveClient.js";

export function generateRetrieveClientForTests(baseData: Client[] = []) {
    const repository = new InMemoryClientRepository(baseData);

    return new RetrieveClient(repository);
}

export function generateRetrieveClientDefault() {
    const repository = MongoClientRepository.getInstance();

    return new RetrieveClient(repository);
}
