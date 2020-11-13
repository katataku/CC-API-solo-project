const { createConnection } = require("typeorm");
const { User } = require("./entity/User");
const { Location } = require("./entity/Location");
const express = require("express");
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
    // const newLocation = new Location();
    // newLocation.line1 = "sotetsu";
    // newLocation.line2 = "toyoko";
    // newLocation.station = "yokohama";
    const savedData = await locationRepository.save(req.body);
    res.send(savedData);
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
