const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const db = require('./models');
const reservationSchema = require('./reservationSchema');
const reservationResolver = require('./reservationResolver');

const app = express();
const port = 5001;

app.use('/graphql', graphqlHTTP({
  schema: reservationSchema,
    rootValue: reservationResolver,
    graphiql: true
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/reservations', (req, res) => {
  reservationResolver.getAllReservations().then((reservations) => {
    res.json(reservations);
  }).catch((err)=>{
    res.status(400).json({ "error": err.message });
  })
});

app.get('/reservation/:id', (req, res) => {
  reservationResolver.getReservationById({id:req.params.id}).then((reservation) => {
    res.json(reservation);
  }).catch((err)=>{
    res.status(400).json({ "error": err.message });
  })
});

app.post('/reservation', (req, res) => {
  reservationResolver.addReservation(req.body).then((reservation) => {
    res.json(reservation);
  }).catch((err)=>{
    res.status(400).json({ "error": err.message });
  })
});

app.put('/reservation/:id', (req, res) => {
  reservationResolver.updateReservation({id:req.params.id, ...req.body}).then((reservation) => {
    res.json(reservation);
  }).catch((err)=>{
    res.status(400).json({ "error": err.message });
  })
});

app.delete('/reservation/:id', (req, res) => {
  reservationResolver.deleteReservation({id:req.params.id}).then((reservation) => {
    res.json(reservation);
  }).catch((err)=>{
    res.status(400).json({ "error": err.message });
  })
});

app.listen(port, () => {
  console.log(`server running on port ${port}.`);
});
