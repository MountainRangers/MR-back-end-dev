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

router.post('/addpost', ensureAuthenticatedandUser, function(req, res, next) {
  req.body.id = req.user.id;
  console.log(req.body);
  api.posts.createOne(req.body).then(function(){
    res.json({id: req.user.id});
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

router.get('/post/:postid', ensureAuthenticatedandUser, function(req, res, next) {
  api.posts.readOne(req.params.postid).then(function(postdata) {
    postdata.posts[0].date = formatDate(postdata.posts[0].created_at);
    // console.log(postdata.tags[0].name);
    res.render('post', {
      title: 'TrailMix',
      post: postdata.posts[0],
      tag: postdata.tags[0]
    });
  });
});

// your own profile
router.delete('/post/:postid', ensureAuthenticatedandUser, function(req, res, next){
  api.posts.deleteOne(req.params.postid).then(function(postdata){
    res.render('/timeline');
  });
});

router.get('/profile/:userid', ensureAuthenticatedandUser, function(req, res, next) {
  api.users.getUsersPosts(req.params.userid).then(function(userdata) {
    var noPosts = userdata.length > 0 ? true : false;
    var showSettings = userdata.id === req.user.id ? true : false;
    if(noPosts) {
      console.log('theres stuff here!')
      res.render('profile', {
        title: 'TrailMix',
        showSettings: showSettings,
        noPosts: noPosts,
        profile: {
          user_id: userdata.user_id,
          photo_url: userdata.photo_url,
          username: userdata.username,
          description: userdata.description,
          memberSince: userdata.memberSince,
          post_created_at: userdata.post_created_at,
          post_title: userdata.post_title,
          latitude: userdata.lat,
          longitude: userdata.long,
          tag_name: userdata.tag_name
        }
      })
    } else {
      console.log('not working!')
      res.render('profile')
    }
  }).catch(function(err) {
    console.log(err);
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

router.put('/settings', ensureAuthenticated, function(req, res, next) {
  api.users.updateUser(
    req.user.id,
    req.body.userinfo
  ).then(function(data){
      res.end('data');
  });
});

router.get('/timeline', ensureAuthenticatedandUser, function(req, res, next) {
  api.posts.readAll().then(function(posts) {
    console.log(posts);
    res.render('timeline', {
      id: req.user.id,
      posts: posts
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
