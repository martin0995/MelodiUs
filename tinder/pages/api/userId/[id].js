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
          console.log("santi", user._id);

          // Encuentro si la otra persona me dio like:

          const findConnections = await Connections.find({
            connectionBy: user._id,
          }).select("-_id referencia");

          // los filtro
          let usersfilter = users.filter(
            (i) => !findConnections.filter((y) => y.referencia == i._id).length
          );

          await db.disconnect();
          res.status(200).send(usersfilter);
        } catch (error) {
          console.log(error);
        }
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
