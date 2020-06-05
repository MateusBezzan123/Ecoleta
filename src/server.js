const express = require("express");
const server = express();

server.use(express.static("public"));

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.get("/", (req, res) => {
  return res.render("index.html", {
    tittle: "Seu marketplace de coleta de resíduos",
  });
});

server.get("/create-point.html", (req, res) => {
  return res.render("create-point.html");
});

server.get("/search-results.html", (req, res) => {
  return res.render("search-results.html");
});
server.listen(3000);
