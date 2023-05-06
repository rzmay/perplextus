import User from 'lib/models/user';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    callbackURL: `${process.env.API_BASE_URL}/ajax/auth/login/google/callback`,
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
  },
  async (accessToken, refreshToken, profile, cb) => {
    const user =
      (await User.findOne({ email: profile._json.email })) ||
      (await User.create({
        email: profile._json.email,
        avatar: profile._json.picture,
        last_login: Date.now(),
        verified: true,
      }));

    cb(null, user);
  }
);

passport.use('google', googleStrategy);

export default passport;
