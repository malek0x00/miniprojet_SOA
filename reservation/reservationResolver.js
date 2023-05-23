const db = require('./models');
const axios = require('axios');

const carServiceURL = 'http://localhost:5000';

const reservationResolver = {
  getReservationById: async ({ id }) => {
    try {
      const row = await new Promise((resolve, reject) => {
        db.get(
          `SELECT * FROM reservations WHERE reservationID = ?`,
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

      if (!row) {
        return null;
      }

      const carID = row.carID;
      const carResponse = await axios.get(`${carServiceURL}/car/${carID}`);
      const car = carResponse.data;

      const reservation = {
        customer_name: row.customer_name,
        car,
        reservationID: row.reservationID,
        resstart: row.resstart,
        resend: row.resend,
      };

      return reservation;
    } catch (error) {
      throw error;
    }
  },

  getAllReservations: async () => {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM reservations`, [], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      const reservations = await Promise.all(
        rows.map(async (row) => {
          const carID = row.carID;
          const carResponse = await axios.get(`${carServiceURL}/car/${carID}`);
          const car = carResponse.data;

          const reservation = {
            customer_name: row.customer_name,
            car,
            reservationID: row.reservationID,
            resstart: row.resstart,
            resend: row.resend,
          };

          return reservation;
        })
      );

      return reservations;
    } catch (error) {
      throw error;
    }
  },

  addReservation: async ({
    customer_name,
    carID,
    reservationID,
    resstart,
    resend,
  }) => {
    try {
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO reservations (customer_name, carID, reservationID, resstart, resend) VALUES (?, ?, ?, ?, ?)`,
          [customer_name, carID, reservationID, resstart, resend],
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });

      const carResponse = await axios.get(`${carServiceURL}/car/${carID}`);
      const car = carResponse.data;

      const reservation = {
        customer_name,
        car,
        reservationID,
        resstart,
        resend,
      };

      return reservation;
    } catch (error) {
      throw error;
    }
  },

  updateReservation: async ({
    id,
    customer_name,
    carID,
    resstart,
    resend,
  }) => {
    try {
      await new Promise((resolve, reject) => {
        db.run(
          'UPDATE reservations SET customer_name = ?, carID = ?, resstart = ?, resend = ? WHERE reservationID = ?',
          [customer_name, carID, resstart, resend, id],
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });

      const carResponse = await axios.get(`${carServiceURL}/car/${carID}`);
      const car = carResponse.data;

      const reservation = {
        customer_name,
        car,
        reservationID: id,
        resstart,
        resend,
      };

      return reservation;
    } catch (error) {
      throw error;
    }
  },

  deleteReservation: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM reservations WHERE reservationID = ?`, [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(`Reservation with ID ${id} deleted.`);
        }
      });
    });
  },
};

module.exports = reservationResolver;
