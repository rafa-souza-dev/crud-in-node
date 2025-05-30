export interface QueueService {
    sendToQueue: (message: string, queue?: string) => Promise<void>;
    consume: (callback: (msg: string) => void, queue?: string) => Promise<void>
}
