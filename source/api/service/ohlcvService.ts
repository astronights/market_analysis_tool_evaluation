import axios, { AxiosResponse } from "axios";
import Ohlcv, { ohlcv } from "../model/ohlcv";
import * as CONFIG from "../../config";

export class OHLCVService {
  public getAll = async (): Promise<ohlcv[]> => {
    return await Ohlcv.find({});
  };

  public getOnePair = async (coin: string): Promise<ohlcv[]> => {
    return await Ohlcv.find({ coin: coin });
  };

  public saveOhlcvPairs = (
    pairs: string[],
    before: number,
    after: number
  ): Promise<ohlcv>[] => {
    return pairs.map((coin) => {
      return this.processOneCoin(coin, before, after);
    });
  };

  private processOneCoin = async (
    coin: string,
    before: number,
    after: number
  ): Promise<ohlcv> => {
    const url = `https://api.cryptowat.ch/markets/${CONFIG.MARKET}/${coin}${CONFIG.CURRENCY}/ohlc?before=${before}&after=${after}&periods=${CONFIG.PERIOD}`;
    const response: AxiosResponse = await axios.get(url);
    if (response.data.result == null) {
      return Promise.resolve(new Ohlcv());
    }
    let candleSticks: ohlcv[] = await response.data.result[
      CONFIG.PERIOD.toString()
    ].map(async (ohlcvRaw: number[]): Promise<ohlcv> => {
      let candleStick = this.buildOhlcv(coin, ohlcvRaw, CONFIG.PERIOD);
      let ohlcvDoc = <ohlcv>await Ohlcv.findOneAndUpdate(
        { _id: candleStick.id },
        candleStick,
        {
          upsert: true,
        }
      );
      return ohlcvDoc;
    });
    let sortedItems = candleSticks.sort((a: ohlcv, b: ohlcv) =>
      a.openTime < b.openTime ? -1 : 1
    );
    let candle = sortedItems[0];
    candle.closeTime = sortedItems[sortedItems.length - 1].closeTime;
    return candle;
  };

  private buildOhlcv = (coin: string, list: number[], period: number) => {
    return new Ohlcv({
      _id: this.getId(
        new Array(coin, (list[0] - period).toString(), list[0].toString())
      ),
      coin: coin,
      closeTime: list[0],
      open: list[1],
      high: list[2],
      low: list[3],
      close: list[4],
      volume: list[5],
      quoteVolume: list[6],
      openTime: list[0] - period,
    });
  };

  private getId = (strings: string[]): string => {
    return strings.join("-");
  };
}
