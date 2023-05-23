const { buildSchema } = require('graphql');

const reservationSchema = buildSchema(`
  type Query {
    reservation(id: Int!): Reservation
    reservations: [Reservation]
  }

  type Mutation {
    addReservation(customer_name: String!, carID: Int!, resstart: String!, resend: String!): Reservation
    updateReservation(id: Int!, customer_name: String!, carID: Int!, resstart: String!, resend: String!): Reservation
    deleteReservation(id: Int!): String
  }

  type Reservation {
    id: Int
    customer_name: String
    carID: Int
    resstart: String
    resend: String
  }
`);

module.exports = reservationSchema;
