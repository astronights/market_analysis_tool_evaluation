export class OhlcvCandleStick {
  coin: String;
  openTime: Number;
  closeTime: Number;
  open: Number;
  high: Number;
  low: Number;
  close: Number;
  volume: Number;
  quoteVolume: Number;

  constructor(coin: String, list: Number[], period: Number) {
    this.coin = coin;
    this.closeTime = list[0];
    this.open = list[1];
    this.high = list[2];
    this.low = list[3];
    this.close = list[4];
    this.volume = list[5];
    this.quoteVolume = list[6];
    this.openTime = Number(this.closeTime) - Number(period);
  }
}
