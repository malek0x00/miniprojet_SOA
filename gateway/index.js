const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
const port = 5005;
const bodyParser = require('body-parser');
// Proxy middleware for car server
const carProxy = createProxyMiddleware('/car', {
  target: 'http://localhost:5000',
  changeOrigin: true,
});

// Proxy middleware for reservation server
const reservationProxy = createProxyMiddleware('/reservation', {
  target: 'http://localhost:5001',
  changeOrigin: true,
});

// Mount the proxy middleware
app.use(carProxy);
app.use(reservationProxy);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
