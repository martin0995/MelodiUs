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
                u.genre + "es" == user.searchGenre &&
                (user.genre + "es" == u.searchGenre ||
                  user.genre + "s" == u.searchGenre)
              );
            if (user.searchGenre == "hombres")
              return (
                user.searchGenre == u.genre + "s" &&
                (user.genre + "es" == u.searchGenre ||
                  user.genre + "s" == u.searchGenre)
              );
            return usersfilter;
          });

          // Filtro Artistas (MUSICA), tienen que coincidir dos artistas. Comparo 2 Arrays:
          // let usersfilter3 = [];
          // usersfilter2.map((usuario) => {
          //   const some = usuario.postedBy.artist.map((r) => {
          //     let contador = 0;
          //     console.log("r", r);
          //     console.log("user", user.postedBy.artist);
          //     if (user.postedBy.artist.includes(r)) {
          //       contador = contador + 1;
          //       console.log("si", r);
          //       console.log("contador", contador);
          //     }
          //     console.log(contador);
          //   });
          //   console.log("q", some);
          // });
          let usersfilter3 = [];
          let matchartist = [];
          for (let i = 0; i < usersfilter2.length; i++) {
            let valor = 0;
            let artistasmatch = [];
            for (let j = 0; j < usersfilter2[i].postedBy.artist.length; j++) {
              console.log(usersfilter2[i].postedBy.artist[j]);

              if (
                user.postedBy.artist.includes(
                  usersfilter2[i].postedBy.artist[j]
                )
              ) {
                valor = valor + 1;
                artistasmatch.push(usersfilter2[i].postedBy.artist[j]);
                if (valor == 2) {
                  usersfilter3.push(usersfilter2[i]);
                  usersfilter3[i]["similarartist"] = artistasmatch;
                }
              }
              // console.log("ccontableS", valor);
            }
          }
          console.log("uuuuuuuuuu", usersfilter3);

          await db.disconnect();
          res.status(200).send(usersfilter2);
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
