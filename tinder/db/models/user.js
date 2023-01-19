import mongoose from "mongoose";
const Profile = require("./profile");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    birthday: { type: Date },
    genre: { type: String },
    searchGenre: { type: String },
    isAdmin: { type: Boolean, default: false },
    images: [{ type: String }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },

    // profile: [{ type: String, default: false }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
