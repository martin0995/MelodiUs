import mongoose from "mongoose";
const User = require("./user");

const profileSchema = new mongoose.Schema(
  {
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    artist: [{ type: String, default: false }],
    movies: [{ type: String, default: false }],
  },
  {
    timestamps: true,
  }
);

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);
export default Profile;
