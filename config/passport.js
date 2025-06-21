const passport = require("passport");
const LocalStorage = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
// import prisma 
// reference: https://github.com/AbdallaAlhag/file-upload-platform/blob/main/config/passport.js

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // find user from Prisma
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      // if user is not found
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      // if password doesn't match
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      // if the user credentials match, return the user
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize user by ID
});

passport.deserializeUser(async (id, done) => {
  try {
    // Find user by ID using prisma
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});

module.exports = passport;