import User from "../../db/models/user";
import db from "../../db/mongodb";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      {
        try {
          await db.connect();
          const findUser = await User.find({ email: req.body.email });
          if (findUser[0]) {
            if (findUser[0].images.length > 0) {
              await db.disconnect();
              return res.status(201).send("nada");
            }

            await db.disconnect();
            return res.status(200).send(findUser);
          }

          const { email } = req.body;
          const user = await new User({
            email,
          }).save();

          await db.disconnect();
          res.status(200).send(user);
        } catch (err) {
          console.log(err);
        }
      }

      break;
    case "GET": //para obtener todos los usuarios
      {
        try {
          await db.connect();

          const users = await User.find().populate("postedBy");
          await db.disconnect();
          res.status(200).send(users);
        } catch (error) {}
      }
      break;

    case "PUT":
      {
        await db.connect();
        const email = { email: req.body.email };
        const userBody = {
          name: req.body.name.value,
          birthday: req.body.birthday.value,
          genre: req.body.genre,
          searchGenre: req.body.searchGenre,
        };

        let user = await User.findOneAndUpdate(email, userBody, {
          returnOriginal: false,
        });

        await db.disconnect();
        res.status(200).send(user);
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
