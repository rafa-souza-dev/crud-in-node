import { Client } from "../../domain/client.js";
import { ClientCreateInput } from "../../domain/client.types.js";
import { QueueService } from "../../infra/queue/queue-service.js";
import { ClientRepository } from "../../repositories/client-repository.js";

export class CreateClient {
    constructor(
        private repository: ClientRepository,
        private queueService: QueueService | null = null
    ) { }

    async handle(data: ClientCreateInput): Promise<{ client: Client }> {
        const client = await this.repository.create(data);

        await this.sendToQueue(`Um cliente foi adicionado: ${JSON.stringify(client)}`)

        return { client };
    }

    async sendToQueue(message: string) {
        if (this.queueService) {
            await this.queueService.sendToQueue(message)
        }
    }
}
