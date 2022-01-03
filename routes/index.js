const express = require('express');
const { pool } = require('../config/database');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { checkAuthenticated, checkNotAuthenticated } = require('../utils/auth');
const isUsername = require('../utils/validator');
const moment = require('moment');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    layout: 'layouts/main',
    title: 'Home'
  });
});

router.get('/login', checkAuthenticated, (req, res) => {
  res.render('login', {
    layout: 'layouts/main',
    title: 'Login',
    message: req.flash('message'),
    error: req.flash('error')
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/products',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', checkNotAuthenticated, (req, res) => {
  req.logOut();
  req.flash('message', 'You have been logged out.');
  res.redirect('/login');
});

router.get('/register', checkAuthenticated, (req, res) => {
  res.render('register', {
    layout: 'layouts/main',
    title: 'Register',
    data: {
      name: '',
      phone: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  });
});

router.post('/register', [
  check('name', 'Name field is required.').notEmpty(),
  check('name', 'Name field should not contain more than 50 characters.').isLength({ max: 50 }),
  check('phone', 'Invalid phone format.').isMobilePhone(),
  check('email', 'Invalid email format.').isEmail(),
  check('email', 'Email field should not contain more than 50 characters.').isLength({ max: 50 }),
  check('username').custom(value => {
    if (!isUsername(value)) throw new Error('Invalid username format.');
    return true;
  }),
  check('username', 'Username field is required.').notEmpty(),
  check('username', 'Username field should not contain more than 50 characters.').isLength({ max: 50 }),
  check('password', 'Password should contain between 8 - 50 characters.').isLength({ min: 8, max: 50 })
], async (req, res) => {
  const errors = validationResult(req);
  const { name, phone, email, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    errors.errors.push({ msg: 'Password does not match.' });
  }

  if (!errors.isEmpty()) {
    res.render('register', {
      layout: 'layouts/main',
      title: 'Register',
      errors: errors.array(),
      data: req.body
    });
  } else {
    pool.query('SELECT email, username FROM users WHERE email = $1 OR username = $2;',
    [email, username],
    async (err, result) => {
      if (err) throw err;

      if (result.rows.length) {
        errors.errors.push({ msg: 'Email or username already registered.' });

        res.render('register', {
          layout: 'layouts/main',
          title: 'Register',
          errors: errors.array(),
          data: req.body
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const joinDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:s');

        pool.query('INSERT INTO users (username, email, password, name, phone, joinDate) VALUES ($1, $2, $3, $4, $5, $6)',
        [username, email, hashedPassword, name, phone, joinDate],
        (err, result) => {
          if (err) throw err;
          req.flash('message', 'Registration successful. You can login now.');
          res.redirect('/login');
        });
      }
    });
  }
});

module.exports = router;