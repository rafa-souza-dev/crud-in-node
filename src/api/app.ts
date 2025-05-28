import express, { Router } from 'express';

import { createClientController } from './controllers/clientClientController.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import { setupSwagger } from './swagger-ui/swagger.js';

const router = Router();
/**
 * @openapi
 * /api/clients:
 *   post:
 *     tags:
 *       - Clients
 *     summary: Cria um novo cliente
 *     description: Recebe os dados de um cliente e cria um novo registro.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client:
 *                 $ref: '#/components/schemas/ClientCreateInput'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client:
 *                   $ref: '#/components/schemas/ClientResponse'
 *       422:
 *         description: Dados inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ZodErrorResponse'
 */
router.post('/clients', createClientController);

export const app = express();
app.use(express.json());
app.use('/api', router);
setupSwagger(app);
app.use(globalErrorHandler);
