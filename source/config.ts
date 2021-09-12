import { resolve } from "path";
import { config } from "dotenv";

config({ path: resolve(__dirname, "../.env") });

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "3000";
const MARKET = process.env.MARKET;
const CURRENCY = process.env.CURRENCY;
const PERIOD = parseInt(process.env.PERIOD || "3600");

export { HOST, PORT, MARKET, CURRENCY, PERIOD };
