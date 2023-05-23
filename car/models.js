const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./cars.sqlite', err => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Database connected.');
});

// Create the cars table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  matricule TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL,
  model TEXT NOT NULL
)`);

// Define the Car class
class Car {
  constructor(matricule, color, model) {
    this.matricule = matricule;
    this.color = color;
    this.model = model;
  }

  // Save a new Car to the database
  save(callback) {
    db.run(
      `INSERT INTO cars (matricule, color, model) VALUES (?, ?, ?)`,
      [this.matricule, this.color, this.model],
      function(err) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        console.log(`Car ${this.matricule} added with the ID: ${this.lastID}`);
        callback(null, this.lastID);
      }
    );
  }

  // Find all cars in the database and return them as Car objects
  static findAll(callback) {
    db.all(`SELECT * FROM cars`, [], function(err, rows) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      const cars = rows.map(
        row => new Car(row.matricule, row.color, row.model)
      );
      callback(null, cars);
    });
  }

  // Find a Car by ID and return it as a Car object
  static findById(id, callback) {
    db.get(`SELECT * FROM cars WHERE id = ?`, [id], function(err, row) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      if (!row) {
        return callback(new Error('Car not found'));
      }
      const car = new Car(row.matricule, row.color, row.model);
      callback(null, car);
    });
  }

  // Update a car by ID with the provided information
  updateById(id, matricule, color, model, callback) {
    db.run(
      `UPDATE cars SET matricule = ?, color = ?, model = ? WHERE id = ?`,
      [matricule, color, model, id],
      function(err) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        console.log(`Car with the ID: ${id} has been updated.`);
        callback(null);
      }
    );
  }

  // Delete a car by ID
  deleteById(id, callback) {
    db.run(`DELETE FROM cars WHERE id = ?`, [id], function(err) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      console.log(`The car with the ID: ${id} has been deleted.`);
      callback(null);
    });
  }
}

// Export the database object for use in other parts of the application
module.exports = db;
