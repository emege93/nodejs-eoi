const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("./models/user");

require("dotenv").config();

// PASSPORT
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, next) => {
      try {
        const user = await User.create({ email, password });
        const error = null;
        return next(null, user);
      } catch (error) {
        next(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, next) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return next(null, false, { message: "User not found" });
        }

        const isValid = await user.isValidPassword(password);

        if (!isValid) {
          return next(null, false, { message: "Email or password not valid" });
        }

        return next(null, user, { message: "Logged in" });
      } catch (error) {
        next(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("token"),
    },
    async (token, next) => {
      try {
        return next(null, token.user);
      } catch (error) {
        next(error);
      }
    }
  )
);

const routers = require("./router");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET || "verysecret";

/* const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(process.env.MONGO_URL, {useUnifiedTopology: true}, (err, client) => {
    if (err) {
        console.log(err);
    }
    const mongoClient = client;
    console.log('Connected to Mongo');
})
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(process.env.MONGO_URL, {useUnifiedTopology: true})
.then(client => console.log('Connected to Database'))
.catch(error => console.log('Error de mongo'));
*/
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .catch((err) => console.log(err));

app.set("view engine", "pug");
app.use(session({ secret: SECRET, saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routers.router);
app.use("/api", passport.authenticate('jwt', {session:false}), routers.apiRouter);

app.listen(PORT, "0.0.0.0");
console.log(`Escuchando en http://localhost:${PORT}`);
