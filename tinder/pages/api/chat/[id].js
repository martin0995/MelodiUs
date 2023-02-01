import Profile from "../../../db/models/profile";
import Connections from "../../../db/models/connections";
import User from "../../../db/models/user";
import db from "../../../db/mongodb";
import Match from "../../../db/models/match";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      {
        try {
          await db.connect();

          console.log("REQ QUERYYY", req.query);

          const id = req.query.id;

          const match = await Match.find({ _id: id }).populate([
            "user1",
            "user2",
          ]);

          await db.disconnect();
          res.status(200).send(match);
        } catch (error) {
          console.log(error);
        }
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
