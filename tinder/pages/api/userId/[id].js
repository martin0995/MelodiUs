import User from "../../../db/models/user";
import db from "../../../db/mongodb";
import Connections from "../../../db/models/connections";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      {
        try {
          await db.connect();

          const email1 = req.query.id;

          // Todos los usuarios menos el mio:
          const users = await User.find({ email: { $ne: email1 } }).populate(
            "postedBy"
          );

          // Encuentro a mi usuario:
          const user = await User.findOne({ email: email1 });

          // Encuentro si la otra persona me dio like:
          // const findConnections = await Connections.find({
          //   connectionBy: user._id,
          // });

          // await delete findConnections[0].connectionBy;
          const findConnections = await Connections.find();

          console.log(findConnections);

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
