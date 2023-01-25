import Profile from "../../db/models/profile";
import User from "../../db/models/user";
import db from "../../db/mongodb";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "PUT":
      {
        await db.connect();
        console.log("reqqqq", req.body);

        const email = { email: req.body.email };
        const description = {
          description: req.body.description,
        };

        let user = await User.findOneAndUpdate(email, description, {
          returnOriginal: false,
        });

        console.log("USERTERMINAL:", user);

        await db.disconnect();
        res.status(200).send(user);
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
