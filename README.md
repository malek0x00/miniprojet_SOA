# Mini projet microservices
This project uses GraphQL, REST API using Express.js and an SQLite database. 
# Usage

git clone https://github.com/malek0x00/miniprojet_SOA.git

npm install

# Cars Microservices
#REST Endpoints  
Base URL: http://localhost:5000

GET /cars : Retrieves all cars from the database.

GET /car/:id Retrieves a specific car by their ID.

POST /car: Creates a new car.

PUT /car/:id Updates an existing car by their ID.

DELETE /car/:id Deletes a car by their ID.

#GraphQL Endpoint

URL: http://localhost:5000/graphql
``` 
mutation {
  addCar(matricule: "200 TN 2312", color: "Red", model: "BMW") {
    id
    matricule
    color
    model
  }
}


``` 


``` 

mutation {
  updateCar(id: 1, matricule: "200 TN 5000", color: "Blue", model: "SUV") {
    id
    matricule
    color
    model
  }
}

  
  ```


 ``` 
 
mutation {
  deleteCar(id: 1)
}
 
 ``` 


# reservation Microservice

#REST Endpoints

Base URL:http://localhost:5001

GET /reservations: Retrieves all reservations from the database.

GET /reservation/:id : Retrieves a specific reservation by its ID.

POST /reservations: : Creates a new reservation.

PUT /reservation/:id : Updates an existing reservation by its ID.

DELETE /reservation/:id : Deletes a reservation by its ID.


Please note that for the REST endpoints, the data is stored in a SQLite database.

#GraphQL Endpoint

URL:http://localhost:5001/graphql

```
mutation {
  addReservation(customer_name: "John Doe", carID: 1, resstart: "2023-06-01", resend: "2023-06-07") {
    id
    customer_name
    carID
    resstart
    resend
  }
}

```

```
mutation {
  updateReservation(id: 1, customer_name: "Jane Smith", carID: 2, resstart: "2023-06-15", resend: "2023-06-20") {
    id
    customer_name
    carID
    resstart
    resend
  }
}

```

```
mutation {
  deleteReservation(id: 1)
}
 ```

# apiGateway Microservices 

Port:http://localhost:5005
