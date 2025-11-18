import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pet Shelter API',
      version: '1.0.0',
      description: 'A simple API to manage pet adoptions at our shelter',
      contact: {
        name: 'Pet Shelter Team',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Pets',
        description: 'Pet management endpoints',
      },
    ],
  },
  apis: ['./server.ts'], // Path to the API routes file
};

export const swaggerSpec = swaggerJsdoc(options);
