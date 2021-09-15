import { Request, Response, Router } from "express";
import { OHLCVService } from "../service/ohlcvService";
import * as utils from "../../utils/dateUtils";
import { coins } from "../../utils/coinUtils";

export class OHLCVController {
  router = Router();
  ohlcv: OHLCVService;

  constructor() {
    this.ohlcv = new OHLCVService();
    this.router.get("/get-all", this.getAllPairs);
    this.router.get("/get-coin", this.getOnePair);
    this.router.post("/save-pairs", this.updatePairs);
  }

  public getAllPairs = (req: Request, res: Response) => {
    return res.status(200).json({ message: "Hello and welcome to the app" });
  };

  public getOnePair = (req: Request, res: Response) => {
    return res.status(200).json({ message: "Hello and welcome to the app" });
  };

  public updatePairs = async (req: Request, res: Response) => {
    let cryptoCoins = req.body.pairs || coins;
    let before = req.body.before || utils.getTimeStamp(new Date());
    let after = req.body.after || utils.getTimeStampLastWeek(new Date());
    let ohlcvItems = await Promise.all(
      this.ohlcv.saveOhlcv(cryptoCoins, before, after)
    );
    return res.status(200).json({ pairs: ohlcvItems });
  };
}
