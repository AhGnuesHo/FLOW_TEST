import mongoose from "mongoose";
import { mongoDBUri } from "../config";

export class MongoAdapter {
  constructor() {
    this.mongo();
  }

  private mongo() {
    mongoose.set("strictQuery", true);
    mongoose.connect(mongoDBUri);
    mongoose.connection.on("connected", () => {
      console.log(`connected to MongoDB`);
    });
  }
}
