import Profile from "../../db/models/profile";
import User from "../../db/models/user";
import db from "../../db/mongodb";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "PUT":
      {
        await db.connect();

        const email = { email: req.body.email };
        const artist = { artist: req.body.artist };
        const findUser = await User.find(email);
        const userid = findUser._id;

        console.log("ARTISTTTT", artist);

        const profile = await new Profile(artist).save();

        console.log("profile", profile);

        await profile.set("userid", userid);

        await db.disconnect();
        res.status(200).send(profile);
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
