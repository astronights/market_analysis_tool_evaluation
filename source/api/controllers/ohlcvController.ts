import { Request, Response, Router } from "express";
import { OHLCVService } from "../service/ohlcvService";
import { Ohlcv } from "../model/ohlcv";

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
  ): Promise<Ohlcv[]> => {
    return await Promise.all(this.ohlcv.saveOhlcv(req.body.pairs));
  };
}
