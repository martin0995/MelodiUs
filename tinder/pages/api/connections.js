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
        console.log(req.body);
        const { connectionBy, like, referencia } = req.body;

        const connection = await new Connections(like).save();

        await connection.set("connectionBy", connectionBy);
        await connection.set("referencia", referencia);

        await connection.save();
        await db.disconnect();
        res.status(200).send(connection);
      }
      break;

    case "GET":
      {
        await db.connect();

        const connection = await Connections.find()
          .populate("connectionBy")
          .populate("referencia");

        await db.disconnect();
        res.status(200).send(connection);
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
