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
            console.log(findUser);
            await db.disconnect();
            return res.status(200).send(findUser);
          }
          console.log("llego");
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
    case "GET":
      {
        // try {
        //   console.log("reqparams", req.query);
        //   const findUser = await User.find({ email: req.params.email });
        //   console.log("finduser2", findUser);
        //   if (findUser[0]) {
        //     console.log(findUser);
        //     console.log("El usuario ya existe3");
        //     return res.status(200).send(findUser);
        //   }
        //   res.status(404).send("No existe usuario");
        // } catch (error) {
        //   console.log(error);
        // }
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
