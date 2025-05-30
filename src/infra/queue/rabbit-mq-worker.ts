import { logger } from "../logger/index.ts";
import { RabbitMQService } from "./rabbit-mq-service.js";

export async function startWorker() {
    const rabbitMQ = await RabbitMQService.getInstance();

    await rabbitMQ.consume((message) => {
        logger.info(`Message was received: ${message}`);
    });
}
