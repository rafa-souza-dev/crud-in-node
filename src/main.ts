import { app } from "./infra/api/app.js";
import { connectMongoDB } from "./infra/db/connect-mongo-db.js";
import { startWorker } from "./infra/queue/rabbit-mq-worker.js";

const PORT = process.env.PORT || 3000;

connectMongoDB()
    .then(() => {
        app.listen(PORT, async () => {
            console.log(`Server is running at http://localhost:${PORT}`);

            try {
                await startWorker();
                console.log('Worker is running');
            } catch (error) {
                console.error('Worker initialization has failed:', error);
            }
        });
    })
