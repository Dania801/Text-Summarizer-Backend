import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

const twitterOpts = {
  consumerKey: "EGLoBrQWNNtCDLYQKh6pupRO1",
  consumerSecret: "9FNzG4LlhCOhnNOf9VGS2SHQXAILjiLXTWfOrr9MT7W6nV05ww",
  callbackURL: "http://127.0.0.1:3000/api/v1/users/auth/twitter/callback",
};

const twitterStrategy = new TwitterStrategy(twitterOpts, async (accessToken, refreshToken, profile, done) => {
  console.log('inside facebook strategy');
  console.log(profile)
  return done(null, profile);
});

passport.use(twitterStrategy);

export const authTwitter = passport.authenticate('twitter', { session: false });
export const authTwitterCallback = passport.authenticate('twitter', { session: false, successRedirect : '/profile', failureRedirect: '/'})
