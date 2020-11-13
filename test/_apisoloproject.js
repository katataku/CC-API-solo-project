const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupExpressServer } = require("../src/server");
const server = setupExpressServer();

describe("API solo project", () => {
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
});
