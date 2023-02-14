import Profile from "../../../db/models/profile";
import Connections from "../../../db/models/connections";
import User from "../../../db/models/user";
import db from "../../../db/mongodb";
import Match from "../../../db/models/match";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    // Trae un match especifico:
    case "GET":
      {
        try {
          await db.connect();
          const [id, email] = req.query.id.split("-");

          const match = await Match.find({ _id: id }).populate([
            "user1",
            "user2",
          ]);

          if (match[0].user1.email !== email) {
            let finalMatch = {
              user: match[0].user1,
              chat: match[0].chat,
              id: match[0]._id,
              myUser: match[0].user2.name,
              myUserImages: match[0].user2.images,
            };

            await db.disconnect();
            res.status(200).send(finalMatch);
          } else if (match[0].user2.email !== email) {
            let finalMatch = {
              user: match[0].user2,
              chat: match[0].chat,
              id: match[0]._id,
              myUser: match[0].user1.name,
            };

            await db.disconnect();
            res.status(200).send(finalMatch);
          }
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
