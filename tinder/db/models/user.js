import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    birthday: { type: Date },
    genre: { type: String },
    searchGenre: { type: String },
    isAdmin: { type: Boolean, default: false },
    // profile: [{ type: String, default: false }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
