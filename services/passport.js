const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const keys = require("../config/keys");
const User = mongoose.model("users");

const app = express();

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });

// MongoDB Atlas Connection
const url = keys.mongoURI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB Atlas');
});

// Passport Configuration
passport.use(new GoogleStrategy({
    clientID: '<google-client-id>',
    clientSecret: '<google-client-secret>',
    callbackURL: 'http://localhost:5500/auth/google/callback'
}, (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
      User.findOne({ userId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            userId: profile.id,
            username: profile.displayName,
            picture: profile._json.picture
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);
   


passport.use(new FacebookStrategy({
    clientID: '<facebook-client-id>',
    clientSecret: '<facebook-client-secret>',
    callbackURL: 'http://localhost:5500/auth/facebook/callback'
}, (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
      User.findOne({ userId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            userId: profile.id,
            username: profile.displayName,
            picture: profile._json.picture
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);

passport.use(new GitHubStrategy({
    clientID: '<github-client-id>',
    clientSecret: '<github-client-secret>',
    callbackURL: 'http://localhost:5500/auth/github/callback'
}, (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
      User.findOne({ userId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            userId: profile.id,
            username: profile.displayName,
            picture: profile._json.picture
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

