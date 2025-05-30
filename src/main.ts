import { app } from "./infra/api/app.ts";
import { connectMongoDB } from "./infra/db/connect-mongo-db.ts";
import { logger } from "./infra/logger/index.ts";
import { startWorker } from "./infra/queue/rabbit-mq-worker.ts";

const PORT = process.env.PORT || 3000;

connectMongoDB()
    .then(() => {
        app.listen(PORT, async () => {
            logger.info(`Server is running at http://localhost:${PORT}`)

            try {
                await startWorker();
                logger.info('Worker is running')
            } catch (error) {
                logger.error(`Worker initialization has failed: ${error}`)
            }
        });
    })
