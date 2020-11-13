const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupExpressServer } = require("../src/server");
const server = setupExpressServer();

describe("Pokemon API Server", () => {
  beforeEach(() => {
    request = chai.request(server);
  });

  it("should return 200", async () => {
    // Setup
    const res = await request.get("/hello");
    chai.expect(res).to.have.status(200);
  });
});
