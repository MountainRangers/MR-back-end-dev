var express = require('express');
var router = express.Router();
var api = require('./api');

router.get('/', function(req, res, next) {
  req.session.destroy();
  res.render('landing', {
    title: 'TrailMix'
  });
});

router.get('/addpost', ensureAuthenticatedandUser, function(req, res, next) {
  res.render('addpost', {
    title: 'TrailMix',
    id: req.user.id,
  });
});

router.get('/makeprofile', ensureAuthenticated, function(req, res, next) {
  if (req.user.id) {
    res.redirect('/timeline');
  } else {
    res.render('makeprofile', {
      title: 'TrailMix',
      profile: req.user
    });
  }
});

router.post('/makeprofile', ensureAuthenticated, function(req, res, next) {
  api.users.createUser({
    email: req.user.email,
    username: req.body.userName,
    google_id: req.user.google_id,
    photo_url: req.user.profilePhoto,
    personal_info: 'Please add some personal info'
  }).then(function(id) {
    res.redirect('/timeline');
  });
});

router.get('/post', ensureAuthenticatedandUser, function(req, res, next) {
  res.render('post', {
    title: 'TrailMix',
    id: req.user.id
  });
});

router.get('/post/:postid', function(req, res, next) {
  api.posts.readOne(req.params.postid).then(function(postdata) {
    postdata.posts[0].date = formatDate(postdata.posts[0].created_at);
    console.log(postdata.tags[0].name);
    res.render('post', {
      title: 'TrailMix',
      post: postdata.posts[0],
      tag: postdata.tags[0]
    });
  });
});

// your own profile
router.get('/profile/:userid', ensureAuthenticatedandUser, function(req, res, next) {
  api.users.getUser(req.params.userid).then(function(userdata) {
    console.log(userdata)
    var date = formatDate(userdata.created_at);
    var showSettings = userdata.id === req.user.id ? true : false;
    res.render('profile', {
      title: 'TrailMix',
      showSettings: showSettings,
      profile: {
        id: userdata.id,
        username: userdata.username,
        date_created: date,
        personal_info: userdata.personal_info,
        photo_url: userdata.photo_url
      }
    });
  }).catch(function(err) {
    res.redirect('/timeline');
  });
});
// someone elses profile
router.get('/profile/other/:userid', ensureAuthenticatedandUser, function(req, res, next) {
  api.users.getUser(req.params.userid).then(function(userdata) {
    console.log(userdata)
    var date = formatDate(userdata.created_at);
    var showSettings = userdata.id === req.user.id ? true : false;
    res.render('profile', {
      title: 'TrailMix',
      showSettings: showSettings,
      profile: {
        id: userdata.id,
        username: userdata.username,
        date_created: date,
        personal_info: userdata.personal_info,
        photo_url: userdata.photo_url
      }
    });
  }).catch(function(err) {
    res.redirect('/timeline');
  });
});


router.get('/settings', ensureAuthenticatedandUser, function(req, res, next) {
  api.users.getUser(req.user.id).then(function(userdata) {
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

router.get('/timeline', ensureAuthenticatedandUser, function(req, res, next) {
  api.posts.readAll().then(function(posts) {
    res.render('timeline', {
      id: req.user.id,
      post: posts,
      title: posts.title,
      photo_url: posts.photo_url,
      latitude: posts.latitude,
      longitude: posts.longitude
    });
  });
});

function formatDate(dateString) {
  var newDate = (dateString).toString().split(' ');
  var formattedDate = newDate[1] + ' ' + newDate[2] + ", " + newDate[3];
  return formattedDate;
}

function ensureAuthenticatedandUser(req, res, next) {
  if (req.isAuthenticated() && req.user.id) {
    return next();
  }
  res.redirect('/');
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
