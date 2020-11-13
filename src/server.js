//const { text } = require("express");
const express = require("express");
const setupExpressServer = () => {
  /* return configured express app */
  const app = express();
  app.use(express.json());

  app.get("/teapot", (req, res) => {
    res.status(418);
    res.send("teapot");
  });

  app.get("/hello", (req, res) => {
    res.send("worldhoghoge");
  });

  app.get("/hellojson", (req, res) => {
    res.json({ hello: "world" });
  });

  app.get("/greet", (req, res) => {
    res.send(`Hello ${req.query.name}!`);
  });

  app.get("/:a/plus/:b", (req, res) => {
    const ans = parseInt(req.params.a) + parseInt(req.params.b);
    res.json({ result: ans });
    //    res.json({ text: parseInt(req.params.a) + parseInt(req.params.b) })
  });

  app.post("/echo", (req, res) => {
    res.json(req.body);
  });

  app.options("/echo", (req, res) => {
    const ans = {};
    const reqJson = req.body;
    for (const item in reqJson) {
      ans[reqJson[item]] = item;
    }
    res.json(ans);
  });

  app.get("/secret", (req, res) => {
    const token = req.query.token;
    if (parseInt(token) % 2 === 0) {
      res.status(200);
    } else {
      res.status(401);
    }
    res.send("");
  });

  app.post("/secret/message", (req, res) => {
    const token = req.query.token;
    if (parseInt(token) % 2 === 0) {
      const shout = req.body.shout;
      if (shout === "marco") {
        res.send("polo");
      } else {
        res.status(403);
        res.send("");
      }
    } else {
      res.status(401);
      res.send("");
    }
  });

  return app;
};

module.exports = { setupExpressServer };