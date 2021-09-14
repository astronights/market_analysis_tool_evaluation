import { Request, Response, Router } from "express";
import { OHLCVService } from "../service/ohlcvService";
import { ohlcv } from "../model/ohlcv";
import * as utils from "../service/util";

export class OHLCVController {
  router = Router();
  ohlcv: OHLCVService;

  constructor() {
    this.ohlcv = new OHLCVService();
    this.router.get("/get-all", this.getMessage);
    this.router.post("/save", this.updatePairs);
  }

  public getMessage = (req: Request, res: Response) => {
    return res.status(200).json({ message: "Hello and welcome to the app" });
  };

  public updatePairs = async (
    req: Request,
    res: Response
  ): Promise<ohlcv[]> => {
    let before = req.body.before || utils.getTimeStamp(new Date());
    let after = req.body.after || utils.getTimeStampLastWeek(new Date());
    return await Promise.all(
      this.ohlcv.saveOhlcv(req.body.pairs, before, after)
    );
  };
}
