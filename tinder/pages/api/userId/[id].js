import User from "../../../db/models/user";
import db from "../../../db/mongodb";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      {
        try {
          await db.connect();

          const email1 = req.query.id;

          const users = await User.find({ email: { $ne: email1 } }).populate(
            "postedBy"
          );

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
