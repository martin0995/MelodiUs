import Profile from "../../db/models/profile";
import User from "../../db/models/user";
import db from "../../db/mongodb";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "PUT":
      {
        await db.connect();
        console.log(req.body);
        const email = { email: req.body.email };
        const artist = { artist: req.body.artist };
        const findUser = await User.find(email);
        const userid = findUser[0]._id;

        const profile = await new Profile(artist).save();

        await profile.set("postedBy", userid);
        await profile.save();

        await db.disconnect();
        res.status(200).send(profile);
      }
      break;

    case "GET":
      {
        await db.connect();

        const profileid = await Profile.find().populate("postedBy");

        await db.disconnect();
        res.status(200).send(profileid);
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
