const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const initializePassport = require('./config/passport');

require('dotenv/config');

const app = express();
const port = process.env.PORT || 3000;
initializePassport(passport);

// EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Assets
app.use(express.static(__dirname + '/public'));

// Middleware
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.name = req.session.name;
  next();
});

// Routes
const indexRoute = require('./routes/index');
const aboutRoute = require('./routes/about');
const productsRoute = require('./routes/products');
const receiptsRoute = require('./routes/receipts');
const usersRoute = require('./routes/users');

app.use('/', indexRoute);
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

// Server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});