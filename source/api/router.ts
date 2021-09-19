import { Router } from "express";

import { TestController } from "./controllers/testController";
import { OHLCVController } from "./controllers/ohlcvController";

const router = Router();

const testApis = new TestController();
const ohlcv = new OHLCVController();

router.use("/test", testApis.router);
router.use("/ohlcv", ohlcv.router);
router.get("/", (req, res) => {
  res.status(200).json("Connected!");
});

export default router;
