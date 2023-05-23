const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const db = require('./models');
const carSchema = require('./carSchema');
const carResolver = require('./carResolver');

const app = express();
const port = 5000;

app.use('/graphql', graphqlHTTP({
  schema: carSchema,
  rootValue: carResolver,
  graphiql: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/cars', (req, res) => {
  carResolver.getAllCars().then((cars) => {
    res.json(cars);
  }).catch((err)=>{
    res.status(400).json({ "error": err.message });
  })
});

app.get('/car/:id', (req, res) => {
  carResolver.getCarById({id:req.params.id}).then((car) => {
    res.json(car);
  }).catch((err)=>{
    res.status(400).json({ "error": err.message });
  })
});

app.post('/car', (req, res) => {
  carResolver.addCar(req.body).then((car) => {
    res.json(car);
  }).catch((err)=>{
    res.status(400).json({ "error": err.message });
  })
});

app.put('/car/:id', (req, res) => {
  carResolver.updateCar({id:req.params.id, ...req.body}).then((car) => {
    res.json(car);
  }).catch((err)=>{
    res.status(400).json({ "error": err.message });
  })
});

app.delete('/car/:id', (req, res) => {
  carResolver.deleteCar({id:req.params.id}).then((car) => {
    res.json(car);
  }).catch((err)=>{
    res.status(400).json({ "error": err.message });
  })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
