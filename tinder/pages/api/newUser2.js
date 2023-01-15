import User from "../../db/models/user";
import db from "../../db/mongodb";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "PUT":
      {
        await db.connect();
        console.log("holaaaaaaaa");
        console.log("req", req.body);
        const email = { email: req.body.email };
        const userBody = {
          images: req.body.imagenes,
        };
        console.log("email", email);
        console.log("userBody", userBody);
        let user = await User.findOneAndUpdate(email, userBody, {
          returnOriginal: false,
        });
        console.log(user);
        await db.disconnect();
        res.status(200).send(user);
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
