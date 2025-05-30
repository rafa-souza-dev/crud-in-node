import express, { Router } from 'express';
import { pino } from 'pino';
import { pinoHttp } from 'pino-http';

import { createClientController } from './controllers/create-client-controller.ts';
import { globalErrorHandler } from './middlewares/global-error-handler.ts';
import { setupSwagger } from './swagger-ui/swagger.ts';
import { listClientsController } from './controllers/list-clients-controller.ts';
import { retrieveClientController } from './controllers/retrieve-client-controller.ts';
import { updateClientController } from './controllers/update-client-controller.ts';
import { validateIdFormat } from './middlewares/validate-id-format.ts';

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
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
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
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundErrorResponse'
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
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
 *       422:
 *         description: Dados inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerErrorResponse'
 */
router.put('/clients/:id', validateIdFormat, updateClientController)

const logger = pino({
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: { colorize: true }
    }
});

export const app = express();

app.use(pinoHttp({ logger }));
app.use(express.json());
app.use('/api', router);
setupSwagger(app);
app.use(globalErrorHandler);
