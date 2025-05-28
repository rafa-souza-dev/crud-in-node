import { Client } from "../../domain/Client.js";
import { InMemoryClientRepository } from "../../repository/InMemoryClientRepository.js";
import { MongoClientRepository } from "../../repository/MongoDBClientRepository.js";
import { UpdateClient } from "./UpdateClient.js";

export function generateUpdateClientForTests(baseData: Client[] = []) {
    const repository = new InMemoryClientRepository(baseData);

    return new UpdateClient(repository);
}

export function generateUpdateClientDefault() {
    const repository = MongoClientRepository.getInstance();

    return new UpdateClient(repository);
}
