var express = require('express');
var router = express.Router();
var api = require('./api');

router.get('/', function(req, res, next) {
  res.render('landing', {
    title: 'TrailMix'
  });
});

router.get('/editor', function(req, res, next) {
  res.render('editor', {
    title: 'TrailMix'
  });
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
  res.render('post', {
    title: 'TrailMix'
  });
});

router.get('/profile/:userid', function(req, res, next) {
  api.users.read(req.params.userid).then(function(userdata) {
    res.render('profile', {
      title: 'TrailMix',
      profile: {
        id: userdata.id,
        username: userdata.username,
        date_created: userdata.created_at,
        personal_info: userdata.personal_info,
        photo_url: userdata.photo_url
      }
    });
  });
});

router.get('/settings', function(req, res, next) {
  res.render('settings', {
    title: 'TrailMix'
  });
});

router.get('/timeline/:userid', function(req, res, next) {
  console.log('HOLLA');
  return api.posts.readAll();
  res.render('timeline', {
    title: 'TrailMix'
  });
});

module.exports = router;
