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
        const { connectionBy, like, referencia } = req.body;

        // Creo el like mio en la base de datos:
        const connection = await new Connections({
          like: like,
          connectionBy: connectionBy,
          referencia: referencia,
        }).save();

        // Encuentro si la otra persona me dio like:
        const findLike = await Connections.find({
          referencia: connectionBy,
          like: true,
          connectionBy: referencia,
        });

        console.log(findLike);

        // Creo el match con la otra persona:
        if (like == true && findLike.length) {
          const match = await new Match({
            chat: [],
          });

          await match.set("user1", connectionBy);
          await match.set("user2", referencia);
          await match.save();
          await db.disconnect();

          return res.status(200).send(match);
        }

        // await connection.save();
        await db.disconnect();
        res.status(200).send(findLike);
      }
      break;

    case "GET":
      {
        await db.connect();

        const connection = await Connections.find();

        await db.disconnect();
        res.status(200).send(connection);
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
