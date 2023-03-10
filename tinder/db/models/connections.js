import mongoose from "mongoose";
const User = require("./user");

const connectionsSchema = new mongoose.Schema(
  {
    connectionBy: { type: String, ref: "User" }, // Usuario que da like
    referencia: { type: String, ref: "User" }, // Usuario al que le doy like
    like: { type: Boolean }, // Si es like o dislike
  },
  {
    timestamps: true,
  }
);

const Connections =
  mongoose.models.Connections ||
  mongoose.model("Connections", connectionsSchema);
export default Connections;
