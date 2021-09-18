import { CronJob } from "cron";
import { OHLCVService } from "../api/service/ohlcvService";
import { getTimeStamp, getTimeStampYesterday } from "../utils/dateUtils";
import { coins } from "../utils/coinUtils";

export const updatePairsTask = new CronJob("0 30 12 * * *", () => {
  let startDate = new Date();
  console.log(`Starting task at ${startDate}`);
  new OHLCVService().saveOhlcvPairs(
    coins,
    getTimeStamp(startDate),
    getTimeStampYesterday(startDate)
  );
  console.log(`Completed task at ${new Date()}`);
});
