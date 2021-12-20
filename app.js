const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;

// EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});