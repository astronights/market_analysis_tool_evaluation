import axios, { AxiosResponse } from "axios";

import { Response } from "express";
import { db } from "./db";
import { OhlcvCandleStick } from "./model";

export class OHLCV {
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

  currency = "usd";

  market = "bitfinex";

  duration = 3600;

  public async saveOhlcv(
    pairs: String[] = this.coins,
    market: String = this.market,
    period: Number = this.duration
  ) {
    var rDate = Math.floor(this.roundDate(new Date()).getTime() / 1000);
    return pairs.map((coin) => {
      return axios
        .get(
          `https://api.cryptowat.ch/markets/${market}/${
            coin + "" + this.currency
          }/ohlc?periods=${period}`
        )
        .then(async (response: AxiosResponse) => {
          let items = await response.data.result[period + ""].map(
            (element: Number[]) => {
              let ohlcvCandleStick = new OhlcvCandleStick(
                coin,
                element,
                period
              );
              // db.collection("ohlcv")
              //   .doc(`${this.getId(ohlcvCandleStick)}`)
              //   .set({ ...ohlcvCandleStick })
              //   .catch((error) => {
              //     console.log(error);
              //   });
              return ohlcvCandleStick;
            }
          );
          let sortedItems = items.sort(
            (a: OhlcvCandleStick, b: OhlcvCandleStick) =>
              a.openTime < b.openTime ? -1 : 1
          );
          let candle = sortedItems[0];
          candle.closeTime = sortedItems[sortedItems.length - 1].closeTime;
          return candle;
        })
        .catch((error: Error) => console.log(error));
    });
  }

  private roundDate = (date: Date): Date => {
    date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
    date.setMinutes(0, 0, 0);
    return date;
  };

  public getId = (ohlcvCandleStick: OhlcvCandleStick): String => {
    return (
      ohlcvCandleStick.coin +
      "-" +
      ohlcvCandleStick.openTime +
      "-" +
      ohlcvCandleStick.closeTime
    );
  };
}
