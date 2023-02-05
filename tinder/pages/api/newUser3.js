import Profile from "../../db/models/profile";
import User from "../../db/models/user";
import db from "../../db/mongodb";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "PUT":
      {
        await db.connect();
        console.log("reqqqq2", req.body);
        const email = { email: req.body.email };
        const artistAndMovies = {
          artist: req.body.artist,
          movies: req.body.movies,
        };

        const findUser = await User.find(email);

        console.log("FINDUSER4>>", findUser[0].postedBy);

        if (!findUser[0].postedBy) {
          const result = await new Profile(artistAndMovies).save();
          console.log("CREADO2:", result);

          await findUser[0].set("postedBy", result._id);
          await findUser[0].save();
          await db.disconnect();
          return res.status(200).send(result);
        }

        if (findUser[0].postedBy) {
          const profile = await Profile.findOne(findUser[0].postedBy);
          profile.movies = req.body.movies;
          profile.artist = req.body.artist;
          profile.save();
          await db.disconnect();
          console.log("UPDETEADO:", profile);
          return res.status(200).send(profile);
        }

        // Find the document
        // Profile.findOneAndUpdate(
        //   findUser[0].postedBy,
        //   artistAndMovies,
        //   options,
        //   async function (error, result) {
        //     if (!error) {
        //       // If the document doesn't exist
        //       if (!result) {
        //         // Create it
        //         result = await new Profile(artistAndMovies).save();
        //         await findUser[0].set("postedBy", result._id);
        //         await findUser[0].save();
        //         await db.disconnect();
        //         console.log("CREADO:", result);

        //         return res.status(200).send(result);
        //       }
        //       // Save the document
        //       result.save(async function (error) {
        //         if (!error) {
        //           await db.disconnect();
        //           console.log("UPDETEADO:", result);
        //           return res.status(200).send(result);
        //         } else {
        //           throw error;
        //         }
        //       });
        //     }
        //   }
        // );

        // await db.disconnect();
        // res.status(200).send(profile);
      }
      break;

    case "GET":
      {
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
