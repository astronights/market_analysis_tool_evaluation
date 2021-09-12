export type Ohlcv = {
  coin: string;
  openTime: number;
  closeTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  quoteVolume: number;
};

export const buildOhlcv = (
  coin: string,
  list: number[],
  period: number
): Ohlcv => {
  return {
    coin: coin,
    closeTime: list[0],
    open: list[1],
    high: list[2],
    low: list[3],
    close: list[4],
    volume: list[5],
    quoteVolume: list[6],
    openTime: list[0] - period,
  };
};

export const getId = (ohlcv: Ohlcv): string => {
  return new Array(
    ohlcv.coin,
    ohlcv.openTime.toString(),
    ohlcv.closeTime.toString()
  ).join("-");
};
