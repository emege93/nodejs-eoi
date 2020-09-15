const { response, request } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");

const router = require("./router");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET || "verysecret";

app.set("view engine", "pug");
app.use(session({ secret: SECRET, saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

app.listen(PORT, "0.0.0.0");
console.log(`Escuchando en http://localhost:${PORT}`);
