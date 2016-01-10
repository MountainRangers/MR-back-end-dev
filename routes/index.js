var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('sending user to splash page')
  res.redirect('https://trailmix.firebaseapp.com/index.html');
});

module.exports = router;
