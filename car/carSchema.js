// Import the dependencies for testing
const { buildSchema } = require('graphql');

// GraphQL schema
const carSchema = buildSchema(`
    type Query {
        car(id: Int!): Car
        cars: [Car]
    }

    type Mutation {
        addCar(matricule: String!, color: String!, model: String!): Car
        updateCar(id: Int!, matricule: String!, color: String!, model: String!): Car
        deleteCar(id: Int!): String
    }

    type Car {
        id: Int
        matricule: String
        color: String
        model: String
    }
`);

module.exports = carSchema;
