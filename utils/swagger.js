import swaggerJSDoc from 'swagger-jsdoc';

import dotenv from 'dotenv';

dotenv.config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description: 'API documentation for our task manager backend'
        },
        servers: [
            {
                url: process.env.NODE_ENV == "development" ? 'http://localhost:5000' : "https://mentorship-api-jys6.onrender.com"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./routes/*.js'] // Where your route files live
};

export const swaggerSpec = swaggerJSDoc(options);
