var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing', {title: 'TrailMix'});
});

router.get('/editor', function(req, res, next) {
  res.render('editor', {title: 'TrailMix'});
});

router.get('/makeprofile', function(req, res, next) {
  res.render('makeprofile', {title: 'TrailMix'});
});

router.get('/post', function(req, res, next) {
  res.render('post', {title: 'TrailMix'});
});

router.get('/profile', function(req, res, next) {
  res.render('profile', {title: 'TrailMix'});
});

router.get('/settings', function(req, res, next) {
  res.render('settings', {title: 'TrailMix'});
});

router.get('/timeline', function(req, res, next) {
  res.render('timeline', {title: 'TrailMix'});
});

module.exports = router;
