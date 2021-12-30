const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./database');
const bcrypt = require('bcrypt');

const initialize = passport => {
  const authenticateUser = (username, password, done) => {
    pool.query('SELECT * FROM users WHERE username = $1',
    [username],
    (err, result) => {
      if (err) throw err;

      if (result.rows.length) {
        const user = result.rows[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password is incorrect.' });
          }
        });
      } else {
        return done(null, false, { message: 'Username does not exist.' });
      }
    });
  };

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    pool.query('SELECT * FROM users WHERE id = $1',
    [id],
    (err, result) => {
      if (err) throw err;
      return done(null, result.rows[0]);
    });
  });
};

module.exports = initialize;