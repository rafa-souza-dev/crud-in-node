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
            ZodErrorResponse: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Validation error' },
                    error: { type: 'string', example: 'Email inválido' }
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
