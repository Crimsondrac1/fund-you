var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");

var db = require("../models");

passport.use(
  new LocalStrategy(function(username, password, done) {
    db.User.findOne({ username: username }, function(err, response) {
      console.log(response);
      if (!response) {
        // invalid user
        console.log("invalid user");
        return done(null, false);
      } else if (!response.validPassword(password)) {
        // invalid password
        console.log("invalid password");
        return done(null, false);
      }
      response.password = null;
      done(null, response);
    });
  })
);

// serialize and deserialize the user for Sequelize
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
