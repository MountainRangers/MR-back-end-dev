var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://trailmix.firebaseapp.com/views/timeline.html"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      return done(null, profile);
    });
  }
));

passport.serializeUser(function(user,done){
  done(null, user)
});

passport.deserializeUser(function(obj,done){
  done(null, obj)
});
