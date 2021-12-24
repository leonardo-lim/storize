const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { Client } = require('pg');

require('dotenv/config');

const app = express();
const port = process.env.PORT || 3000;

// EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Assets
app.use(express.static(__dirname + '/public'));

// Routes
const homeRoute = require('./routes/index');
const aboutRoute = require('./routes/about');
const productsRoute = require('./routes/products');
const receiptsRoute = require('./routes/receipts');
const usersRoute = require('./routes/users');

app.use('/', homeRoute);
app.use('/about', aboutRoute);
app.use('/products', productsRoute);
app.use('/receipts', receiptsRoute);
app.use('/users', usersRoute);

// Not Found Page
app.use('/', (req, res) => {
  res.status(404);
  res.render('not-found', {
    layout: 'layouts/main',
    title: 'Page Not Found'
  });
});

// Database
const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

client.connect();

// Server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});