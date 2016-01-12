var express = require('express');
var router = express.Router();
var api = require('./api');

router.get('/', function(req, res, next) {
  res.render('landing', {title: 'TrailMix'});
});

router.get('/editor', function(req, res, next) {
  res.render('editor', {title: 'TrailMix'});
});

router.get('/makeprofile', function(req, res, next) {
  //check to see if user exists in the database
  api.users.readOne(req.user.google_id).then(function(user) {
    //if they already exist, then redirect to timeline
    if (user) {
      res.redirect('/timeline/' + user.id);
    } else {
      //if they do not exist, then render makeprofile view
      res.render('makeprofile', {
        title: 'TrailMix',
        profile: req.user
      });
    }
  }).catch(function(error) {
    console.log(error);
  });
});

router.post('/makeprofile', function(req, res, next) {
  //insert user data to database
  api.users.createUser({
    username: req.body.userName,
    google_id: req.user.google_id,
    photo_url: req.user.profilePhoto,
    personal_info: 'none'
  }).then(function(id) {
    //redirect to timeline with userid in url
    res.redirect('/timeline/' + id);
  });
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

router.get('/timeline/:userid', function(req, res, next) {
api.posts.readAll().then(function(posts){
    res.render('timeline', {post: posts, title: posts.title, lat: posts.latitude, lon: posts.longitude});
    //console.log(posts)
  });
});

module.exports = router;
