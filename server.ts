import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

const app = express();
import animalsDataImport from './DummyData.json' with { type: "json" };

type Animal = {
    name: string;
    species: string;
    age: number;
    state: string;
};

type AnimalRecord = {
    [key: string]: Animal;
};

const animalsData: AnimalRecord = animalsDataImport;

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Get all pets
 *     description: Retrieve a list of all pets in the shelter
 *     tags:
 *       - Pets
 *     responses:
 *       200:
 *         description: A list of all pets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Leo
 *                   species:
 *                     type: string
 *                     example: Lion
 *                   age:
 *                     type: number
 *                     example: 5
 *                   state:
 *                     type: string
 *                     enum: [rescued, adopted]
 *                     example: rescued
 */
app.get('/', (req, res) => {
    res.send(animalsData);
});

/**
 * @swagger
 * /pets/{id}/adopt:
 *   put:
 *     summary: Adopt a pet
 *     description: Mark a pet as adopted by changing its state
 *     tags:
 *       - Pets
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The pet ID (e.g., lion1, dog2, cat1)
 *         example: lion1
 *     responses:
 *       200:
 *         description: Pet successfully adopted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Leo has been adopted!
 *                 pet:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Leo
 *                     species:
 *                       type: string
 *                       example: Lion
 *                     age:
 *                       type: number
 *                       example: 5
 *                     state:
 *                       type: string
 *                       example: adopted
 *       400:
 *         description: Pet is already adopted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Pet is already adopted
 *       404:
 *         description: Pet not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Pet not found
 */
app.put('/pets/:id/adopt', (req, res) => {
    const petId = req.params.id;
    
    // Check if the pet exists
    if (!(petId in animalsData)) {
        return res.status(404).json({ error: 'Pet not found' });
    }
    
    // Check if pet is already adopted
    if (animalsData[petId].state === 'adopted') {
        return res.status(400).json({ error: 'Pet is already adopted' });
    }
    
    // Adopt the pet by updating its state
    animalsData[petId].state = 'adopted';
    
    res.json({ 
        message: `${animalsData[petId].name} has been adopted!`,
        pet: animalsData[petId]
    });
});
 
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
    console.log('Swagger documentation available at http://localhost:3000/api-docs');
});
