const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
let Account = require('../models/account.model');
const key = require('./key');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Account.findById(jwt_payload.id)
        .then(account => {
          if (account) return done(null, account);
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};