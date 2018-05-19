import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import User from '../modules/users/user.model';
import constants from '../config/constants';

const twitterOpts = {
  consumerKey: "EGLoBrQWNNtCDLYQKh6pupRO1",
  consumerSecret: "9FNzG4LlhCOhnNOf9VGS2SHQXAILjiLXTWfOrr9MT7W6nV05ww",
  callbackURL: "http://127.0.0.1:3000/api/v1/users/auth/twitter/callback",
};

const twitterStrategy = new TwitterStrategy(twitterOpts, async (accessToken, refreshToken, profile, done) => {
  try {
    upsertUser(accessToken, refreshToken, profile, (err, user)=>{
      return done(err, user)
    });
  } catch (err) {
    return done(err, false);
  }
});

function upsertUser(token, tokenSecret, profile, done){
  console.log(profile)
    return User
      .findOne({'twitter.id': profile.id }, (err, user) => {
      if (!user) {
        const twitterInfo = {
          id: profile.id,
          fullName: profile.displayName,
          screenName: profile.username,
        };

        var newUser = new User({
          userName: profile.userName,
          photo: profile.photos[0].value,
          twitter: twitterInfo
        });

        newUser.save( (error, savedUser) => {
          if (error) {
            console.log(error);
          }
          return done(error, savedUser);
        });
      } else {
        return done(err, user);
      }
    });
}

passport.use(twitterStrategy);

export const authTwitter = passport.authenticate('twitter', { session: false });
export const authTwitterCallback = passport.authenticate('twitter', { session: false, failureRedirect: '/'})
