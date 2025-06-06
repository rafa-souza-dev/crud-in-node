import amqp, { Channel, ChannelModel } from 'amqplib';

import { QueueService } from './queue-service.ts';

const rabbitMqUrl = process.env.RABBIT_MQ_URL ?? 'amqp://guest:guest@rabbitmq:5672'

export class RabbitMQService implements QueueService {
    private static instance: RabbitMQService | null = null;
    private connection!: ChannelModel;
    private channel!: Channel;
    private queue = 'clients_queue';

    private constructor(private url: string = rabbitMqUrl) { }

    public static async getInstance(url: string = rabbitMqUrl): Promise<RabbitMQService> {
        if (!RabbitMQService.instance) {
            const instance = new RabbitMQService(url);
            await instance.connect();
            RabbitMQService.instance = instance;
        }
        return RabbitMQService.instance;
    }

    private async connect(): Promise<void> {
        this.connection = await amqp.connect(this.url);
        this.channel = await this.connection.createChannel();
    }

    public async sendToQueue(message: string, queue: string = this.queue): Promise<void> {
        await this.channel.assertQueue(queue, { durable: true });

        this.channel.sendToQueue(queue, Buffer.from(message));
    }

    public async consume(callback: (msg: string) => void, queue: string = this.queue): Promise<void> {
        await this.channel.assertQueue(queue, { durable: true });

        this.channel.consume(queue, (msg) => {
            if (msg) {
                callback(msg.content.toString());
                this.channel.ack(msg);
            }
        });
    }
}
