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
    this.router.get("/get-coin/:coin", this.getOnePair);
    this.router.post("/save-pairs", this.updatePairs);
  }

  public getAllPairs = async (req: Request, res: Response) => {
    return res.status(200).json(await this.ohlcv.getAll());
  };

  public getOnePair = async (req: Request, res: Response) => {
    return res.status(200).json(await this.ohlcv.getOnePair(req.params.coin));
  };

  public updatePairs = async (req: Request, res: Response) => {
    let cryptoCoins = req.body.pairs || coins;
    let before = req.body.before || utils.getTimeStamp(new Date());
    let after = req.body.after || utils.getTimeStampYesterday(new Date());
    let ohlcvItems = await Promise.all(
      this.ohlcv.saveOhlcvPairs(cryptoCoins, before, after)
    );
    return res.status(200).json({ pairs: ohlcvItems });
  };
}
