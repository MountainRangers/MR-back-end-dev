var express = require('express');
var router = express.Router();
var passport = require('passport');
var api = require('./api');

router.get('/google',
  passport.authenticate('google', {
    scope: 'email https://www.googleapis.com/auth/plus.login'
  })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    api.users.getUser_GoogleID(req.user.google_id).then(function(user) {
      if (user) {
        res.redirect('/timeline/' + user.id);
      } else {
        res.redirect('/makeprofile');
      }
    }).catch(function(error) {
      console.log(error);
    });
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
