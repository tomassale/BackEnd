const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;

passport.use(
  "jwt",
  new JWTStrategy(
    {
      secretOrKey: process.env.PRIVATE_KEY,
      jwtFromRequest: (req) => req.cookies.auth,
    },
    async (token, done) => {
      try {
        return done(null, token);
      } catch (error) {
        done(error);
      }
    }
  )
);