import Profile from "../../db/models/profile";
import Connections from "../../db/models/connections";
import User from "../../db/models/user";
import db from "../../db/mongodb";
import Match from "../../db/models/match";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    // Traer todos los MATCHES con mi usuario:
    case "POST":
      {
        await db.connect();

        const email = req.body.email;

        console.log("EMAIL>>", email);

        const user = await User.findOne({ email: email });

        const matches = await Match.find({
          $or: [{ user1: user._id }, { user2: user._id }],
        }).populate(["user1", "user2"]);

        console.log("MATCHES>", matches);

        let finalMatch = [];

        matches.map((match) => {
          if (match.user1.email !== user.email) {
            let obj = { user: match.user1, chat: match.chat, id: match._id };
            finalMatch.push(obj);
          } else if (match.user2.email !== user.email) {
            let obj = { user: match.user2, chat: match.chat, id: match._id };
            finalMatch.push(obj);
          }
        });

        await db.disconnect();
        res.status(200).send(finalMatch);
      }
      break;

    // Agregar mensajes a la base de datos:
    case "PUT":
      {
        await db.connect();

        const id = req.body.id;
        const mensaje = { author: req.body.author, message: req.body.mensaje };

        console.log("MENSAJE", mensaje);

        const match = await Match.find({ _id: id }).populate([
          "user1",
          "user2",
        ]);

        console.log("MATCHHH", match);

        await match[0].chat.push(mensaje);

        await match[0].save();

        await db.disconnect();
        res.status(200).send(match);
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
