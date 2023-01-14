import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: "User" },
    artist: [{ type: String, default: false }],
  },
  {
    timestamps: true,
  }
);

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);
export default Profile;
