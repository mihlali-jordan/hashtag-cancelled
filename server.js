const express = require('express')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const cookieSession = require('cookie-session')

require('dotenv').config()

const port = 8080
const app = express()

app.use(
  cookieSession({
    name: 'twitter-auth-session',
    keys: ['key1', 'key2'],
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackUrl: 'http://localhost:8080/auth/twitter/callback',
    },
    (token, tokenSecret, profile, cb) => {
      return cb(token)
    }
  )
)

app.get('/auth/twitter', passport.authenticate('twitter'))
app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/',
  }),
  (req, res) => {
    console.log(res)
    res.redirect('/')
  }
)

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})
