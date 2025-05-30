export interface QueueService {
    sendToQueue(queue: string, message: string): Promise<void>;
}
