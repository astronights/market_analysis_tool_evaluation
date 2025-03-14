import { Request, Response, Router } from "express";
import { OHLCVService } from "../service/ohlcvService";
import * as utils from "../../utils/dateUtils";
import { coins } from "../../utils/coinUtils";

export class OHLCVController {
  router = Router();
  ohlcv: OHLCVService;

  constructor() {
    this.ohlcv = new OHLCVService();
    this.router.get("/all", this.getAllPairs);
    this.router.get("/coin/:coin", this.getOnePair);
    this.router.get("/latest-coins", this.getLatestCoins);
    this.router.post("/save", this.updatePairs);
  }

  public getAllPairs = async (req: Request, res: Response): Promise<any> => {
    return res.status(200).json(await this.ohlcv.getAll());
  };

  public getOnePair = async (req: Request, res: Response): Promise<any> => {
    return res.status(200).json(await this.ohlcv.getOnePair(req.params.coin));
  };

  public getLatestCoins = async (req: Request, res: Response): Promise<any> => {
    return res.status(200).json(await this.ohlcv.getLatestCoins());
  };

  public updatePairs = async (req: Request, res: Response): Promise<any> => {
    let cryptoCoins = req.body.pairs || coins;
    let before = req.body.before || utils.getTimeStamp(new Date());
    let after = req.body.after || utils.getTimeStampYesterday(new Date());
    let ohlcvItems = await Promise.all(
      this.ohlcv.saveOhlcvPairs(cryptoCoins, before, after)
    );
    return res.status(200).json({ pairs: ohlcvItems });
  };
}
