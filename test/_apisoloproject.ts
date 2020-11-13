//const chai = require("chai");
import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
//const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupExpressServer } = require("../src/server");
const server = setupExpressServer();
import DatabaseConnectionManager from "../src/database";

let request;
describe("API solo project", () => {
  before(() => {
    DatabaseConnectionManager.connect().then();
  });
  beforeEach(() => {
    request = chai.request(server);
  });

  it("should return 418", async () => {
    const res = await request.get("/teapot");
    chai.expect(res).to.have.status(418);
  });

  it("should return 200", async () => {
    const res = await request.get("/hello");
    chai.expect(res).to.have.status(200);
  });

  it("should get Location", async () => {
    const res = await request.get("/location");
    chai.expect(res).to.have.status(200);
    chai.expect(res.body[0].station).to.equal("yokohama");
  });

  it("should post Location", async () => {
    const res1 = await request.get("/location");
    const init_cnt = res1.body.length;

    const postData = {
      line1: "testLine1",
      line2: "testline2",
      station: "testStation",
    };
    request = chai.request(server);
    const resPost = await request.post("/location").send(postData);
    request = chai.request(server);
    const res2 = await request.get("/location");
    const post_cnt = res2.body.length;

    chai.expect(init_cnt + 1).to.equal(post_cnt);

    request = chai.request(server);
    const resDelete = await request.delete("/location/" + resPost.body.id);

    request = chai.request(server);
    const res3 = await request.get("/location");
    const delete_cnt = res3.body.length;
    chai.expect(init_cnt).to.equal(delete_cnt);
  });

  it("should return 200 in multiple requests", async () => {
    const res = await request.get("/hello");
    chai.expect(res).to.have.status(200);
    request = chai.request(server);

    const res2 = await request.get("/hello");
    chai.expect(res2).to.have.status(200);
  });

  it("should get search", async () => {
    const res = await request.get("/location?line1=sotetsu&line2=toyoko");
    chai.expect(res).to.have.status(200);
    chai.expect(res.body.station).to.equal("yokohama");
  });
});
