import User from "../../db/models/user";
import db from "../../db/mongodb";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      {
        // Obtengo description del usuario:
        try {
          await db.connect();

          const id = { _id: req.body.id.userId };

          const user = await User.findOne(id).populate("postedBy");

          await db.disconnect();
          res.status(200).send(user);
        } catch (error) {
          console.log(error);
        }
      }
      break;
  }
}
