import User from "../../db/models/user";
import db from "../../db/mongodb";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "PUT":
      {
        await db.connect();

        const email = { email: req.body.email };
        const images = { images: [req.body.imagenes[0], req.body.imagenes[1]] };

        let user = await User.findOneAndUpdate(email, images, {
          returnOriginal: false,
        });

        await db.disconnect();
        res.status(200).send(user);
      }
      break;

    case "POST":
      {
        try {
          await db.connect();
          const email = { email: req.body.email };

          const users = await User.findOne(email).populate("postedBy");

          await db.disconnect();
          res.status(200).send(users);
        } catch (error) {}
      }
      break;
    case "GET": // identificar tu usuario
      {
        try {
          await db.connect();
          const email = { email: req.body.email };

          const users = await User.findOne(email);

          await db.disconnect();
          res.status(200).send(users);
        } catch (error) {}
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
