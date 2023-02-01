import Profile from "../../db/models/profile";
import Connections from "../../db/models/connections";
import User from "../../db/models/user";
import db from "../../db/mongodb";
import Match from "../../db/models/match";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      {
        await db.connect();

        const email = req.body.email;

        const user = await User.findOne({ email: email });

        const matches = await Match.find({
          $or: [{ user1: user._id }, { user2: user._id }],
        }).populate(["user1", "user2"]);

        console.log("MATCHES", matches);

        await db.disconnect();
        res.status(200).send(matches);
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
