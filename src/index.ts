import "reflect-metadata";
import DatabaseConnectionManager from "./database";

const { setupExpressServer } = require("./server");
const PORT = process.env.PORT || 3000;
const app = setupExpressServer();
DatabaseConnectionManager.connect().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
});
