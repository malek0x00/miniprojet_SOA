const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./reservations.sqlite', err => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Database connected.');
});

// Create the reservations table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  carID INTEGER NOT NULL,
  resstart DATETIME NOT NULL,
  resend DATETIME NOT NULL
)`);

// Define the Reservation class
class Reservation {
  constructor(customer_name, carID, resstart, resend) {
    this.customer_name = customer_name;
    this.carID = carID;
    this.resstart = resstart;
    this.resend = resend;
  }

  // Save a new reservation to the database
  save(callback) {
    db.run(
      `INSERT INTO reservations (customer_name, carID, resstart, resend) VALUES (?, ?, ?, ?)`,
      [this.customer_name, this.carID, this.resstart, this.resend],
      function(err) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        console.log(`Reservation added with the ID: ${this.lastID}`);
        callback(null, this.lastID);
      }
    );
  }

  // Find all reservations in the database and return them as Reservation objects
  static findAll(callback) {
    db.all(`SELECT * FROM reservations`, [], function(err, rows) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      const reservations = rows.map(
        row => new Reservation(row.customer_name, row.carID, row.resstart, row.resend)
      );
      callback(null, reservations);
    });
  }

  // Find a reservation by ID and return it as a Reservation object
  static findById(id, callback) {
    db.get(`SELECT * FROM reservations WHERE id = ?`, [id], function(err, row) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      if (!row) {
        return callback(new Error('Reservation not found'));
      }
      const reservation = new Reservation(row.customer_name, row.carID, row.resstart, row.resend);
      callback(null, reservation);
    });
  }

  // Update a reservation by ID with the provided information
  updateById(id, customer_name, carID, resstart, resend, callback) {
    db.run(
      `UPDATE reservations SET customer_name = ?, carID = ?, resstart = ?, resend = ? WHERE id = ?`,
      [customer_name, carID, resstart, resend, id],
      function(err) {
        if (err) {
          console.error(err.message);
          return callback(err);
        }
        console.log(`Reservation with the ID: ${id} has been updated.`);
        callback(null);
      }
    );
  }

  // Delete a reservation by ID
  deleteById(id, callback) {
    db.run(`DELETE FROM reservations WHERE id = ?`, [id], function(err) {
      if (err) {
        console.error(err.message);
        return callback(err);
      }
      console.log(`The reservation with the ID: ${id} has been deleted`);
      callback(null);
    });
  }
}

// Export the database object for use in other parts of the application
module.exports = db;
