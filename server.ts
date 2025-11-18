import express from 'express';
const app = express();
import animalsData from './DummyData.json' with { type: 'json' }; // static import with assertion
import data from './DUMMY.json' with { type: 'json' }; // static import with assertion

// type animals: AnimalRecord = animalsData;

app.get('/details/:state', (req, res) => {
    console.log('end point');
    const state = req.params.state;
    const resData = data.data;
    if (!state || !checkStateParam(state)) {
        res.send(resData);
    } else {
        console.log(`state is good, it's ${state}`);
        res.send(resData.filter((animal) => animal.state === state));
    }
});

function checkStateParam(param: string) {
    return param === 'rescued' || param === 'adopted';
}

app.get('/', (req, res) => {
    res.send(animalsData);
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
