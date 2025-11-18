import express from 'express';
const app = express();
import animalsData from './DummyData.json' with { type: "json" }; // static import with assertion


// type animals: AnimalRecord = animalsData;

app.get('/', (req, res) => {
    res.send(animalsData);
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
