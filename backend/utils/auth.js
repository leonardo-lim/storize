const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/products');
  } else {
    next();
  }
};

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = { checkAuthenticated, checkNotAuthenticated };