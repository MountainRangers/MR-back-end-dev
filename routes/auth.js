var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/google',
  passport.authenticate('google', {
    scope: 'https://www.googleapis.com/auth/plus.login'
  })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    console.log(err);
  });
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
 res.redirect('/');
}

module.exports = router;
