import Profile from "../../db/models/profile";
import Connections from "../../db/models/connections";
import User from "../../db/models/user";
import db from "../../db/mongodb";
import { Connection } from "mongoose";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      {
        await db.connect();
        const { connectionBy, like, referencia } = req.body;

        const connection = await new Connections({
          like: like,
          connectionBy: connectionBy,
          referencia: referencia,
        }).save();

        await connection.save();
        await db.disconnect();
        res.status(200).send(connection);
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
