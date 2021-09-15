import express from "express";
import { createServer } from "http";
import * as CONFIG from "./config";
import { updatePairsTask } from "./task/updatePairsTask";

import router from "./api/router";

const app = express();

app.use(express.json());
app.use("/", router);

const HOST = CONFIG.HOST || "127.0.0.1";
const PORT = parseInt(CONFIG.PORT || "3000");

const httpServer = createServer(app).listen(PORT, HOST, () => {
  console.log(`Started server at ${HOST}:${PORT}`);
  updatePairsTask.start();
});
