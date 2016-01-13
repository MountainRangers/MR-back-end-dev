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
  res.render('makeprofile', {
    title: 'TrailMix',
    profile: req.user
  });
});

router.post('/makeprofile', function(req, res, next) {
  api.users.createUser({
    email: req.user.email,
    username: req.body.userName,
    google_id: req.user.google_id,
    photo_url: req.user.profilePhoto,
    personal_info: 'Please add some personal info'
  }).then(function(id) {



    res.redirect('/timeline/' + id[0]);
  });
});

router.get('/post', function(req, res, next) {
  res.render('post', {
    title: 'TrailMix'
  });
});

router.get('/profile/:userid', function(req, res, next) {
  api.users.getUser(req.params.userid).then(function(userdata) {
    var date = formatDate(userdata.created_at);
    res.render('profile', {
      title: 'TrailMix',
      profile: {
        id: userdata.id,
        username: userdata.username,
        date_created: date,
        personal_info: userdata.personal_info,
        photo_url: userdata.photo_url
      }
    });
  });
});

router.get('/settings/:userid', function(req, res, next) {
  api.users.getUser(req.params.userid).then(function(userdata) {
    var date = formatDate(userdata.created_at);
    res.render('settings', {
      title: 'TrailMix',
      profile: {
        id: userdata.id,
        username: userdata.username,
        date_created: date,
        personal_info: userdata.personal_info,
        photo_url: userdata.photo_url
      }
    });
  });
});

router.get('/timeline/:userid', function(req, res, next) {
  api.posts.readAll().then(function(posts) {
    res.render('timeline', {
      post: posts,
      title: posts.title,
      photo_url: posts.photo_url,
      latitude: posts.latitude,
      longitude: posts.longitude
    });
  });
});

function formatDate(dateString){
  var newDate = (dateString).toString().split(' ');
  var formattedDate = newDate[1] + ' ' + newDate[2] + ", " + newDate[3];
  return formattedDate;
}



module.exports = router;
