const express = require("express");
const next = require("next");
const { join } = require("path");

const dev = process.env.NODE_ENV !== "production";

const port = process.env.PORT ? process.env.PORT : 3000;

const app = next({ dir: ".", dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.enable('trust proxy')

    server.get("/robots.txt", (req, res) => {
      res.type("text/plain");
      res.send(`
          User-agent: *
          Disallow: /
      `);
    });

    server.get("/*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port,() => {
      console.log(`Ready > http://localhost:${port}`)
    });

}).catch((error) => {
    throw error;
});
