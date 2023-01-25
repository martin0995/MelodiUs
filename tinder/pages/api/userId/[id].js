import User from "../../../db/models/user";
import db from "../../../db/mongodb";
import Connections from "../../../db/models/connections";
import ageCalculator from "../../../reactHooks/ageCalculator";

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      {
        try {
          await db.connect();

          const email1 = req.query.id;

          // Todos los usuarios menos el mio:
          let users = await User.find({ email: { $ne: email1 } }).populate(
            "postedBy"
          );

          // Camabiamos propiedad de objetos dentro de un array (birthday):
          users = users.map((person) => {
            const resultFinal = Object.assign({}, person);
            resultFinal._doc.birthday = ageCalculator(person.birthday);
            return resultFinal._doc;
          });

          // Encuentro a mi usuario:
          const user = await User.findOne({ email: email1 }).populate(
            "postedBy"
          );

          // Tengo todos los IDs de las personas que les di like:
          const findConnections = await Connections.find({
            connectionBy: user._id,
          }).select("-_id referencia");

          console.log("find", findConnections);

          // FILTRO de likes o dislike:
          let usersfilter = users.filter(
            (i) => !findConnections.filter((y) => y.referencia == i._id).length
          );

          // Filtro de GENERO:
          const usersfilter2 = usersfilter.filter((u) => {
            if (user.searchGenre == "mujeres")
              return (
                u.genre == "mujer" &&
                (user.genre + "es" == u.searchGenre ||
                  user.genre + "s" == u.searchGenre ||
                  u.searchGenre == "ambos")
              );
            if (user.searchGenre == "hombres")
              return (
                user.searchGenre == u.genre + "s" &&
                (user.genre + "es" == u.searchGenre ||
                  user.genre + "s" == u.searchGenre ||
                  u.searchGenre == "ambos")
              );
            return usersfilter;
          });

          // Filtro Artistas (MUSICA), tienen que coincidir dos artistas. Comparo 2 Arrays:
          // let usersfilter3 = [];
          // usersfilter2.map((usuario) => {
          //   return usuario.postedBy.artist.some((r) => {
          //     if (user.postedBy.artist.indexOf(r) >= 1) {
          //       usersfilter3.push(usuario);
          //     }
          //   });
          // });

          let usersfilter3 = [];
          for (let i = 0; i < usersfilter2.length; i++) {
            let valorArtist = 0;
            let valorMovies = 0;
            let artistasmatch = [];
            let moviesmatch = [];
            let pusheado = false;

            for (let j = 0; j < usersfilter2[i].postedBy.artist.length; j++) {
              if (
                user.postedBy.artist.includes(
                  usersfilter2[i].postedBy.artist[j]
                )
              ) {
                valorArtist = valorArtist + 1;
                artistasmatch.push(usersfilter2[i].postedBy.artist[j]);

                if (valorArtist == 1) {
                  usersfilter3.push(usersfilter2[i]);
                  pusheado = true;
                  usersfilter3[i]["similarartist"] = artistasmatch;
                }
              }
              if (
                user.postedBy.movies.includes(
                  usersfilter2[i].postedBy.movies[j]
                )
              ) {
                valorMovies = valorMovies + 1;
                moviesmatch.push(usersfilter2[i].postedBy.movies[j]);

                if (valorMovies == 1) {
                  if (pusheado == false) {
                    usersfilter3.push(usersfilter2[i]);
                  }
                  usersfilter3[i]["similarmovies"] = moviesmatch;
                }
              }
            }
          }

          await db.disconnect();
          res.status(200).send(usersfilter3);
        } catch (error) {
          console.log(error);
        }
      }
      break;
    case "DELETE":
      {
        await db.connect();

        const email = { email: req.query.id };
        console.log(email);

        try {
          const userdelete = await User.deleteOne(email);
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
