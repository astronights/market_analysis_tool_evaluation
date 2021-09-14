import mongoose, { ConnectOptions } from "mongoose";
import * as CONFIG from "../config";

const mongo_uri = CONFIG.MONGO_URI;

if (mongo_uri === undefined) {
  throw "Please define the MONGO_URI in the .env file!";
}

mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB`);
});

mongoose.connection.on("error", () => {
  console.log(`Error connecting to MongoDB`);
});

export default mongoose;
