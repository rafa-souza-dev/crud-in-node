import { RabbitMQService } from "./rabbit-mq-service.js";

export async function startWorker() {
    const rabbitMQ = await RabbitMQService.getInstance();

    await rabbitMQ.consume((message) => {
        console.log(`Mensagem recebida: ${message}`);
    });
}
