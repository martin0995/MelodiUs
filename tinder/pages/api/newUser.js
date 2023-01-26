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

    case "PUT":
      {
        await db.connect();
        const email = { email: req.body.email };

        console.log("REQ BODYY", req.body);
        console.log("BIRTHDAYY", req.body.birthday);

        const userBody = {
          name: req.body.name,
          birthday: req.body.birthday,
          genre: req.body.genre,
          searchGenre: req.body.searchGenre,
          description: req.body.description,
          ageRange: req.body.ageRange,
          location: req.body.location,
        };

        let user = await User.findOneAndUpdate(email, userBody, {
          returnOriginal: false,
        });

        await db.disconnect();
        res.status(200).send(user);
      }
      break;

    case "DELETE":
      {
        await db.connect();
        console.log("reqqqqq", req.query);
        const email = { email: req.body.email };

        try {
          const userdelete = await User.deleteOne({ email });
          console.log(userdelete);
          await db.disconnect();
          res.send("se elimino");
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
