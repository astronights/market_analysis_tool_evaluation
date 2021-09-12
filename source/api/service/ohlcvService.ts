import axios, { AxiosResponse } from "axios";

import { Response } from "express";
import { db } from "../../db/db";
import { Ohlcv, buildOhlcv, getId } from "../model/ohlcv";

import * as CONFIG from "../../config";

export class OHLCVService {
  coins = [
    "btc",
    "eth",
    "ltc",
    "bfx",
    "bcc",
    "bcu",
    "eos",
    "iota",
    "dash",
    "xrp",
    "xmr",
    "omg",
    "neo",
    "san",
    "avt",
    "qtum",
    "bt1",
  ];

  public saveOhlcv = (pairs: string[] = this.coins): Promise<Ohlcv>[] => {
    return pairs.map((coin) => {
      return this.processOneCoin(coin);
    });
  };

  private processOneCoin = async (coin: string): Promise<Ohlcv> => {
    const url = `https://api.cryptowat.ch/markets/${CONFIG.MARKET}/${coin}${CONFIG.CURRENCY}/ohlc?periods=${CONFIG.PERIOD}`;
    console.log(url);
    const response: AxiosResponse = await axios.get(url);
    // let dbSaves: FirebaseFirestore.WriteResult[] = [];
    let candleSticks = <Ohlcv[]>response.data.result[
      CONFIG.PERIOD.toString()
    ].map(async (ohlcvRaw: number[]) => {
      let candleStick = buildOhlcv(coin, ohlcvRaw, CONFIG.PERIOD);
      console.log(candleStick);
      db.collection("ohlcv").doc(getId(candleStick)).set(candleStick);
    });
    let sortedItems = candleSticks.sort((a: Ohlcv, b: Ohlcv) =>
      a.openTime < b.openTime ? -1 : 1
    );
    let candle = sortedItems[0];
    console.log(candleSticks);
    candle.closeTime = sortedItems[sortedItems.length - 1].closeTime;
    // try {
    //   Promise.all(dbSaves);
    // } catch (e) {
    //   console.log(e);
    // }
    return candle;
  };
}
