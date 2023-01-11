import User from "../../db/models/user";
import db from "../../db/mongodb";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      {
        try {
          console.log(req.body);
          //  console.log(req.body);
          await db.connect();
          const { name, password, email, isAdmin } = req.body;

          const user = await new User({
            name,
            password,
            email,
            isAdmin,
          }).save();
          await db.disconnect();
          res.status(200).send(user);
        } catch (err) {
          console.log(err);
        }
      }

      // Creación de usuario

      break;
    case "GET":
      {
      }
      break;

    case "PUT":
      {
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
