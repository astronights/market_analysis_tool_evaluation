import { Request, Response, Router } from "express";
import { OHLCV } from "../../db/ohlcv";

export class OHLCVController {
  path = "/ohlcv";
  router = Router();
  ohlcv: OHLCV;

  constructor() {
    this.ohlcv = new OHLCV();
    this.router.get(this.path, this.getMessage);
    this.router.post(this.path, this.updatePairs);
  }

  public getMessage = (req: Request, res: Response) => {
    return res.status(200).json({ message: "Hello and welcome to the app" });
  };

  public updatePairs = async (req: Request, res: Response) => {
    return await this.ohlcv
      .saveOhlcv(req.body.pairs, req.body.market, req.body.period)
      .then((response) => {
        console.log(response);
        return res.json(response);
      })
      .catch((error) => console.log(error));
  };
}
