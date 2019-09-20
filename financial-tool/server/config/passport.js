var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models').Users;

passport.use(new LocalStrategy (
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },

    function(req, email, password, done) {
        db.findOne({
            where: {
                email: email
            }
        }).then(function(dbUser) {
            if(!dbUser) {
                return done(null, false, {
                    message: "Unauthorized"
                });
            } else if(!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Unauthorized"
                });
            }
            return done(null, dbUser);
        });
    }
));

  // In order to help keep authentication state across HTTP requests,
  // Sequelize needs to serialize and deserialize the user
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;