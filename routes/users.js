const express = require('express');
const { pool } = require('../config/database');
const { checkNotAuthenticated } = require('../utils/auth');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const isUsername = require('../utils/validator');
const router = express.Router();

router.get('/:username', checkNotAuthenticated, (req, res) => {
  const username = req.params.username;

  pool.query('SELECT * FROM users WHERE username = $1',
  [username],
  (err, result) => {
    if (err) throw err;

    if (result.rows.length) {
      const joinDate = moment(result.rows[0].joindate);
      const now = moment(Date.now());

      const year = now.diff(joinDate, 'years');
      const month = now.diff(joinDate, 'months');
      const day = now.diff(joinDate, 'days');
      const hour = now.diff(joinDate, 'hours');
      const minute = now.diff(joinDate, 'minutes');
      const second = now.diff(joinDate, 'seconds');

      let joinedFrom;

      if (year > 1) {
        joinedFrom = `${year} years`;
      } else if (year === 1) {
        joinedFrom = `${year} year`;
      } else if (month > 1) {
        joinedFrom = `${month} months`;
      } else if (month === 1) {
        joinedFrom = `${month} month`;
      } else if (day > 1) {
        joinedFrom = `${day} days`;
      } else if (day === 1) {
        joinedFrom = `${day} day`;
      } else if (hour > 1) {
        joinedFrom = `${hour} hours`;
      } else if (hour === 1) {
        joinedFrom = `${hour} hour`;
      } else if (minute > 1) {
        joinedFrom = `${minute} minutes`;
      } else if (minute === 1) {
        joinedFrom = `${minute} minute`;
      } else if (second > 1) {
        joinedFrom = `${second} seconds`;
      } else {
        joinedFrom = `${second} second`;
      }

      res.render('user-profile', {
        layout: 'layouts/main',
        title: 'User Profile',
        user: result.rows[0],
        joinedFrom: joinedFrom,
        isMyUser: req.session.username === username,
        message: req.flash('message')
      });
    } else {
      res.render('errors/not-found', {
        layout: 'layouts/main',
        title: 'Page Not Found'
      });
    }
  });
});

router.get('/edit/:username', checkNotAuthenticated, (req, res) => {
  const username = req.params.username;

  pool.query('SELECT * FROM users WHERE username = $1',
  [username],
  (err, result) => {
    if (err) throw err;

    if (result.rows.length) {
      if (req.session.username !== username) {
        res.render('errors/access-denied', {
          layout: 'layouts/main',
          title: 'Access Denied'
        });
      } else {
        res.render('user-edit', {
          layout: 'layouts/main',
          title: 'Edit Profile',
          user: result.rows[0]
        });
      }
    } else {
      res.render('errors/not-found', {
        layout: 'layouts/main',
        title: 'Page Not Found'
      });
    }
  });
});

router.post('/update', [
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
  check('username', 'Username field should not contain more than 50 characters.').isLength({ max: 50 })
], checkNotAuthenticated, (req, res) => {
  const errors = validationResult(req);
  const { name, phone, email, username, address, city, country } = req.body;
  let { zipCode } = req.body;

  if (!zipCode) zipCode = null;

  if (!errors.isEmpty()) {
    res.render('user-edit', {
      layout: 'layouts/main',
      title: 'Edit Profile',
      errors: errors.array(),
      user: req.body
    });
  } else {
    pool.query('SELECT email FROM users WHERE email = $1;',
    [email],
    (err, result) => {
      if (err) throw err;

      const currentUsername = req.session.username;

      pool.query('SELECT username FROM users WHERE username = $1 AND username != $2;',
      [username, currentUsername],
      (err, result) => {
        if (result.rows.length) {
          errors.errors.push({ msg: 'Username already exists.' });

          res.render('user-edit', {
            layout: 'layouts/main',
            title: 'Edit Profile',
            errors: errors.array(),
            user: req.body
          });
        } else {
          pool.query('UPDATE users SET name = $1, username = $2, phone = $3, address = $4, city = $5, country = $6, zipCode = $7 WHERE email = $8;',
          [name, username, phone, address, city, country, zipCode, email],
          (err, result) => {
            if (err) throw err;

            if (username !== currentUsername) {
              req.logOut();
              req.flash('message', 'User updated. Please relogin.');
              res.redirect('/login');
            } else {
              req.session.name = name;
              req.flash('message', 'User updated.');
              res.redirect(`/users/${username}`);
            }
          });
        }
      });
    });
  }
});

module.exports = router;