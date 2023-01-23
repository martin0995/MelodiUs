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
        const artistAndMovies = {
          artist: req.body.artist,
          movies: req.body.movies,
        };
        console.log(artistAndMovies);

        const findUser = await User.find(email);

        const profile = await new Profile(artistAndMovies).save();

        await findUser[0].set("postedBy", profile._id);
        await findUser[0].save();
        console.log("que ondaaa");

        await db.disconnect();
        res.status(200).send(profile);
      }
      break;

    case "GET":
      {
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
