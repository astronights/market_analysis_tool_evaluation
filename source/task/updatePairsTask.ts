import { CronJob } from "cron";
import { OHLCVService } from "../api/service/ohlcvService";
import { getTimeStamp, getTimeStampLastWeek } from "../utils/dateUtils";
import { coins } from "../utils/coinUtils";

export const updatePairsTask = new CronJob("0 30 12 * * 0", () => {
  let startDate = new Date();
  console.log(`Starting task at ${startDate}`);
  new OHLCVService().saveOhlcv(
    coins,
    getTimeStamp(startDate),
    getTimeStampLastWeek(startDate)
  );
  console.log(`Completed task at ${new Date()}`);
});
