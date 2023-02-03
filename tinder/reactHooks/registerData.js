import axios from "axios";
import ageCalculator from "../reactHooks/ageCalculator";
import { login } from "../store/reducers/userSlice";
// import { useDispatch } from "react-redux";

const registerData = async (email, dispatch) => {
  const usuario = await axios.post("/api/newUser2", {
    email: email,
  });

  const userRedux = {
    id: usuario.data._id,
    name: usuario.data.name,
    email: usuario.data.email,
    birthday: usuario.data.birthday,
    edad: ageCalculator(usuario.data.birthday),
    genre: usuario.data.genre,
    searchGenre: usuario.data.searchGenre,
    isAdmin: false,
    images: usuario.data.images,
    movies: usuario.data.postedBy?.movies || null,
    artists: usuario.data.postedBy?.artist || null,
    description: usuario.data.description,
    ageRange: usuario.data.ageRange,
    location: usuario.data.location,
    city: usuario.data.city,
    distance: usuario.data.distance,
    artistSelection: usuario.data.artistPreference,
    movieSelection: usuario.data.moviePreference,
  };

  dispatch(login(userRedux));
};

export default registerData;
