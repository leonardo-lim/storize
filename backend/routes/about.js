const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('about', {
    layout: 'layouts/main',
    title: 'About'
  });
});

module.exports = router;