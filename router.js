const { response } = require("express");
const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  const mysession = request.session;

  if (mysession.email) {
    return response.redirect("/admin");
  }

  response.render("index");
});

// POST CRUD API
const POST_ENDPOINT = "/api/v1/posts";

router.post(POST_ENDPOINT, (request, response) => {
  const post = request.body;
  response.send("POST");
});

router.get(POST_ENDPOINT, (request, response) => {
  response.send("GET");
});

router.get(`${POST_ENDPOINT}/:id`, (request, response) => {
  response.send("GET");
});

router.put(`${POST_ENDPOINT}/:id`, (request, response) => {
  response.send("PUT");
});

router.delete(`${POST_ENDPOINT}/:id`, (request, response) => {
  response.send(`DELETE ${request.params.id}`);
});

router.get("/admin", (request, response) => {
  const session = request.session;

  if (session.email) {
    response.write(`<h1>Hola ${session.email}</h1><br>`);
    response.end('<a href="/logout">Logout</a>');
  } else {
    return response.redirect("/login");
  }
});

router.get("/login", (request, response) => {
  const session = request.session;

  if (session.email) {
    return response.redirect("/admin");
  }

  response.render("login");
});
router.get("/login", (request, response) => {
  const session = request.session;
  session.email = request.body.email;
  response.end("correcto");
});
router.get("/logout", (request, response) => {
  request.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    response.redirect("/");
  });
});

module.exports = router;
