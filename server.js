const express = require("express");
const next = require("next");

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/main", (req, res) => {
    return app.render(req, res, "/main", req.query);
  });

  server.get("*", (req, res) => {
    return res.send("<div><h1>Hellow world</h1></div>");
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
