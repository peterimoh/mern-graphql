import { Mongoose, connect } from "mongoose";
import mongoose from "mongoose";

mongoose.connect(
  "mongodb://localhost:27017/mernql",
  // { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);
});

export const db: Mongoose = mongoose;