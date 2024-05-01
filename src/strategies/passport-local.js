import passport from "passport";
import { Strategy } from "passport-local";
import prisma from "../lib/prisma.js";
import { compare } from "bcrypt";
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    done(null, user);
  } catch (err) {
    console.log(err);
  }
});
async function verifyCallback(email, password, done) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return done(null, false, { message: "Invalid Credentials" });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: "Invalid Credentials" });
    }
    return done(null, user);
  } catch (err) {
    console.log(err);
  }
}

export default passport.use(
  new Strategy({ usernameField: "email" }, verifyCallback)
);
