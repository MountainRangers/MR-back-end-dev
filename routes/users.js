var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('https://trailmix.firebaseapp.com/views/timeline.html')
});

module.exports = router;
