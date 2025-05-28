import express, { Router } from 'express';

import { createClientController } from './controllers/clientClientController.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';

const router = Router();
router.post('/clients', createClientController);

export const app = express();
app.use(express.json());
app.use('/api', router);
app.use(globalErrorHandler);
