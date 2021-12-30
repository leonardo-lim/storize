const express = require('express');
const { checkNotAuthenticated } = require('../utils/auth');
const router = express.Router();

router.get('/', checkNotAuthenticated, (req, res) => {
  req.session.name = req.user.name;
  res.locals.name = req.user.name;

  res.render('product', {
    layout: 'layouts/main',
    title: 'Product'
  });
});

module.exports = router;