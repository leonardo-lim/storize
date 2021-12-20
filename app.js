const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;

// EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

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

// Server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});