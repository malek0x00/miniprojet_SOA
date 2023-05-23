const db = require('./models');

const carResolver = {
  getCarById: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM cars WHERE id = ?`,
        [id], 
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  },

  getAllCars: () => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM cars`, 
        [], 
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  },

  addCar: ({ matricule, color, model }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO cars (matricule, color, model) VALUES (?, ?, ?)`,
        [matricule, color, model],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, matricule, color, model });
          }
        }
      );
    });
  },

  updateCar: ({ id, matricule, color, model }) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE cars SET matricule = ?, color = ?, model = ? WHERE id = ?',
        [matricule, color, model, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, matricule, color, model });
          }
        }
      );
    });
  },

  deleteCar: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM cars WHERE id = ?`,
        [id],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(`Car with id ${id} deleted.`);
          }
        }
      );
    });
  }
};

module.exports = carResolver;
