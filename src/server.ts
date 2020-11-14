const { createConnection } = require("typeorm");
const { User } = require("./entity/User");
const { Location } = require("./entity/Location");
const express = require("express");
const _ = require("underscore");

import { getRepository, Repository, DeleteResult } from "typeorm";

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

  app.get("/listLocations", async (req, res) => {
    const locationRepository = getRepository(Location);
    let target = {};

    if (typeof req.query.line1 !== "undefined") {
      target = {
        line1: req.query.line1,
      };
    }

    let locations = await locationRepository.find(target);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

    res.send(locations.map((x) => _.pick(x, "line1", "line2")));
  });

  app.get("/location", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
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
    const savedData = await locationRepository.save(req.body);
    res.status(201).send(savedData);
  });

  app.delete("/location/:id", async (req, res) => {
    const target = { id: req.params.id };
    const locationRepository = await getRepository(Location);
    await locationRepository.delete(target);
    res.send("deleted");
  });

  app.put("/location/:id", async (req, res) => {
    const locationRepository = await getRepository(Location);
    const target = {
      id: req.params.id,
    };
    await locationRepository.update(target, req.body);
    res.send(req.body);
  });

  return app;
};

module.exports = { setupExpressServer };
