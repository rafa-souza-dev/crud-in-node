import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Crud in node',
        version: '1.0.0',
        description: 'Documentação da API',
    },
    components: {
        schemas: {
            ClientCreateInput: {
                type: 'object',
                required: ['name', 'email', 'phone'],
                properties: {
                    name: { type: 'string', example: 'Rafael Souza' },
                    email: { type: 'string', format: 'email', example: 'rafael@example.com' },
                    phone: { type: 'string', example: '(99) 99999-9999' },
                },
            },
            ClientResponse: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: '64d45efb1234567890abc123' },
                    name: { type: 'string', example: 'Rafael Souza' },
                    email: { type: 'string', example: 'rafael@example.com' },
                    phone: { type: 'string', example: '(99) 99999-9999' },
                    created_at: { type: 'string', format: 'date-time', example: '2024-08-23T10:20:30Z' },
                    updated_at: { type: 'string', format: 'date-time', example: '2024-08-23T10:25:30Z' },
                },
            },
            ValidationErrorResponse: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'ValidationError' },
                    message: { type: 'string', example: 'Input is not valid' },
                    status_code: { type: 'integer', example: 422 },
                    details: { type: 'array', example: ['Email inválido'] }
                },
            },
            NotFoundErrorResponse: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'NotFoundError' },
                    message: { type: 'string', example: 'Client not found' },
                    status_code: { type: 'integer', example: 404 }
                },
            },
            InternalServerErrorResponse: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'InternalServerError' },
                    message: { type: 'string', example: 'Unknow error' },
                    status_code: { type: 'integer', example: 500 },
                    details: { type: 'array', example: ['Falha ao conectar-se ao banco de dados'] }
                },
            },
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/infra/api/app.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
