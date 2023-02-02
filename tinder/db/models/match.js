import mongoose from "mongoose";
const User = require("./user");

const matchSchema = new mongoose.Schema(
  {
    user1: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chat: [{ author: String, message: String }],
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);
export default Match;
