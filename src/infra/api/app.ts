import express, { Router } from 'express';

import { createClientController } from './controllers/createClientController.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import { setupSwagger } from './swagger-ui/swagger.js';
import { listClientsController } from './controllers/listClientsController.js';
import { retrieveClientController } from './controllers/retrieveClientController.js';
import { updateClientController } from './controllers/updateClientController.js';
import { validateIdFormat } from './middlewares/validateIdFormat.js';

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

/**
 * @openapi
 * /api/clients:
 *   get:
 *     tags:
 *       - Clients
 *     summary: Lista todos os clientes
 *     description: Retorna uma lista de todos os clientes cadastrados.
 *     responses:
 *       200:
 *         description: Lista de clientes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clients:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ClientResponse'
 */
router.get('/clients', listClientsController)

/**
 * @openapi
 * /api/clients/{id}:
 *   get:
 *     tags:
 *       - Clients
 *     summary: Busca um cliente pelo ID
 *     description: Retorna os dados de um cliente específico com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente.
 *         schema:
 *           type: string
 *           example: 64d45efb1234567890abc123
 *     responses:
 *       200:
 *         description: Cliente encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client:
 *                   $ref: '#/components/schemas/ClientResponse'
 *       404:
 *         description: Cliente não encontrado.
 */
router.get('/clients/:id', validateIdFormat, retrieveClientController)

/**
 * @openapi
 * /api/clients/{id}:
 *   put:
 *     tags:
 *       - Clients
 *     summary: Atualiza um cliente pelo ID
 *     description: Atualiza os dados de um cliente específico com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente.
 *         schema:
 *           type: string
 *           example: 64d45efb1234567890abc123
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
 *       200:
 *         description: Cliente atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client:
 *                   $ref: '#/components/schemas/ClientResponse'
 *       404:
 *         description: Cliente não encontrado.
 *       422:
 *         description: Dados inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ZodErrorResponse'
 */
router.put('/clients/:id', validateIdFormat, updateClientController)

export const app = express();
app.use(express.json());
app.use('/api', router);
setupSwagger(app);
app.use(globalErrorHandler);
