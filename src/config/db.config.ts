import { Mongoose, connect } from "mongoose";
import mongoose from "mongoose";

mongoose.connect(
  process.env.DBURL,
  // { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);
});

export const db: Mongoose = mongoose;