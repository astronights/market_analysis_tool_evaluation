import mongoose from "../../db/mongo";

const ohlcvSchema = new mongoose.Schema(
  {
    _id: String,
    coin: String,
    openTime: Number,
    closeTime: Number,
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number,
    quoteVolume: Number,
  },
  { _id: false }
);

export interface ohlcv extends mongoose.Document {
  _id: string;
  coin: string;
  openTime: number;
  closeTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  quoteVolume: number;
}

export default mongoose.model<ohlcv>("ohlcv", ohlcvSchema);
