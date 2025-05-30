import { app } from "./infra/api/app.js";
import { connectMongoDB } from "./infra/db/connect-mongo-db.js";

const PORT = process.env.PORT || 3000;

connectMongoDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
