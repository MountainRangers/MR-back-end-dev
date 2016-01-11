var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.HOST + '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, {
      id: profile.id,
      displayName: profile.displayName,
      profilePhoto: profile.photos[0].value
    });
  }
));

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done){
  done(null, user);
});
