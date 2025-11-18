import express from 'express';
const app = express();
import animalsData from './DummyData.json' with { type: "json" }; // static import with assertion
import swaggerUi from 'swagger-ui-express';
import addPetsDoc from './docs/addPetsDoc.json' with { type: 'json' };

// Setup Swagger UI for API documentation
app.use('/add-pets-docs', swaggerUi.serve, swaggerUi.setup(addPetsDoc));

// Define TypeScript interfaces for better type checking
interface Animal {
  name: string;
  species: string;
  age: number;
  state: string;
}
// Define the structure of the animals data
interface AnimalRecord {
  [key: string]: Animal;
}

// Cast or declare animalsData with the AnimalRecord type
const animals: AnimalRecord = animalsData;

app.get('/', (req, res) => {
    res.send(animalsData);
});

// Route to add a new animal
app.post('/pets/add', express.json(), (req, res) => {
    const newAnimals = req.body;
    // loop through the newAnimals and add each to animalsData
    const addedAnimals: Record<string, typeof newAnimals extends Array<any> ? typeof newAnimals[0] : typeof newAnimals> = {};
    
      if (Array.isArray(newAnimals)) {
        // Handle array of animals
        newAnimals.forEach((animal, index) => {
            const id = `${Object.keys(animalsData).length + 1 }`;
            console.log('Adding animal with id:', id);
            animals[id] = animal;
            addedAnimals[id] = animal;
        });
        
        res.status(201).send({ added: addedAnimals });
    } else if (typeof newAnimals === 'object' && newAnimals !== null) {
        // Handle single animal object
        const id = `${Object.keys(animalsData).length + 1}`;
        animals[id] = newAnimals;
        addedAnimals[id] = newAnimals;
    res.status(201).send({ added: addedAnimals });
    } else {
        // Invalid input
        res.status(400).send({ error: 'Request body must be an animal object or an array of animals.' });
    }
});

// Export the app for testing
export default app;

// Start the server only when this file is run directly (not imported)
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`) {
    app.listen(3000, () => {
        console.log('Server running at http://localhost:3000');
    });
}
