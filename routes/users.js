const express = require('express');
const { pool } = require('../config/database');
const { checkNotAuthenticated } = require('../utils/auth');
const moment = require('moment');
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
        isMyUser: req.session.username === username
      });
    } else {
      res.render('not-found', {
        layout: 'layouts/main',
        title: 'Page Not Found'
      });
    }
  });
});

module.exports = router;