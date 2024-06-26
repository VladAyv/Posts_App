const passport = require("passport");
const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const User = require("../models/userModel");
const dotenv = require("dotenv");

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(options, async (jwtPayLoad, done) => {
    try {
      console.log("jwtstrategy", jwtPayLoad);
      const user = await User.query().findById(jwtPayLoad.user_id);
      console.log("user", user);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;
