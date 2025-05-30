import { Client } from "../../domain/client.js";
import { RabbitMQService } from "../../infra/queue/rabbit-mq-service.js";
import { InMemoryClientRepository } from "../../repositories/in-memory-client-repository.js";
import { MongoClientRepository } from "../../repositories/mongo-db-client-repository.js";
import { CreateClient } from "./create-client.js";

export function generateCreateClientForTests(baseData: Client[] = []) {
    const repository = new InMemoryClientRepository(baseData);

    return new CreateClient(repository);
}

export async function generateCreateClientDefault() {
    const repository = MongoClientRepository.getInstance();
    const queueService = await RabbitMQService.getInstance();

    return new CreateClient(repository, queueService);
}
