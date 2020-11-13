const { createConnection } = require("typeorm");
const { User } = require("./entity/User");
const { Location } = require("./entity/Location");
const express = require("express");
//const DatabaseConnectionManager = require("./database")
import { getRepository, Repository, DeleteResult } from "typeorm";

import DatabaseConnectionManager from "./database";
const setupExpressServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/teapot", (req, res) => {
    res.status(418);
    res.send("teapot");
  });

  app.get("/hello", async (req, res) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.send(users);
  });

  app.get("/location", async (req, res) => {
    const locationRepository = getRepository(Location);

    let locations;

    if (
      typeof req.query.line1 !== "undefined" &&
      typeof req.query.line2 !== "undefined"
    ) {
      locations = await locationRepository.findOne({
        line1: req.query.line1,
        line2: req.query.line2,
      });
    } else {
      locations = await locationRepository.find();
    }

    res.send(locations);
  });

  app.post("/location", async (req, res) => {
    const locationRepository = await getRepository(Location);
    const newLocation = new Location();
    newLocation.line1 = "sotetsu";
    newLocation.line2 = "toyoko";
    newLocation.station = "yokohama";
    const savedData = await locationRepository.save(req.body);
    res.send(savedData);
  });
  app.delete("/location/:id", async (req, res) => {
    const target = { id: req.params.id };
    const locationRepository = await getRepository(Location);
    await locationRepository.delete(target);
    res.send("deleted");
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
