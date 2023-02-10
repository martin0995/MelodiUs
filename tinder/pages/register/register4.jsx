import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import handleInput from "../../reactHooks/handleInput";
import Icon from "../Index/Icon";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/reducers/userSlice";
import registerData from "../../reactHooks/registerData.js";

const register3 = () => {
  const user = useSelector((state) => state.user);
  const { data: session, status } = useSession();
  const router = useRouter();
  const data2 = router.query;

  if (user.movies) {
    var movieredux = [...user.movies];
  }
  const dispatch = useDispatch();

  const searchedMovies = handleInput();
  const [movies, setMovies] = useState([]);
  const [savedMovies, setsavedMovies] = useState(movieredux || []);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      registerData(session.user.email, dispatch);
    }
  }, [status]);

  useEffect(() => {
    if (user.movies) {
      setsavedMovies([...user.movies]);
    }
  }, [user]);

  const Nextpage = (event) => {
    event.preventDefault();
    if (data2.settings == "true") {
      return router.push("/logged/userProfile/info");
    }
    router.push("/register/register2");
  };

  useEffect(() => {
    try {
      if (searchedMovies.value) {
        const timer = setTimeout(() => {
          axios
            .get(
              `https://api.themoviedb.org/3/search/movie?api_key=19810e339e7024271bcad7d3a8767450&query=${searchedMovies.value}`
            )
            .then((response) => response.data)
            .then((peliculas) => setMovies(peliculas.results));
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }, [searchedMovies.value]);

  const selectMovies = (movie) => {
    // Limit up to 7 artists to choose
    if (savedMovies.length < 5) {
      if (savedMovies.includes(movie)) {
        return alert(`Ya tenes agregado a ${movie}`);
      }

      setsavedMovies([...savedMovies, movie]);
    } else {
      alert("No se puede agregar mas de 5 artistas");
    }
  };

  const deleteArtist = (movie) => {
    const index = savedMovies.indexOf(movie);
    savedMovies.splice(index, 1);
    setDeleted(!deleted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (savedMovies.length !== 5) {
      return alert("Por favor, seleccionar 5 peliculas.");
    }
    await axios.put("/api/newUser3", {
      email: session.user.email,
      movies: savedMovies,
    });

    const movies = {
      movies: savedMovies,
    };

    dispatch(update(movies));
    if (data2.settings == "true") {
      return router.push("/logged/userProfile/info");
    }

    router.push("/register/register3");
  };

  return (
    <div className="bg-black text-white h-screen">
      <div className="flex flex-row text-verdedos">
        <div className="text-black">
          <button className="p-2 text-2xl ml-2 text-white" onClick={Nextpage}>
            <BiArrowBack />
          </button>
        </div>
        <div className="p-2 h-8 flex ml-8 w-1/2 justify-center">
          <Icon />
          <h6> tinderMusic</h6>
        </div>
      </div>

      <div className="flex flex-col text-2xl m-6">
        <div className="flex flex-col gap-1 items-center">
          <p className="text-lg font-bold uppercase">Agrega película</p>
          <input
            className="h-10 bg-transparent p-2 text-base outline-0 border-b-2 w-40"
            type="text"
            placeholder="Ingresar película..."
            {...searchedMovies}
          ></input>
        </div>
      </div>

      {searchedMovies.value ? (
        <div className="m-2">
          {movies
            ? movies.slice(0, 5).map((movie) => {
                return (
                  <div className="w-full max-w-md p-1 border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flow-root bg-gray-800 ">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 dark:divide-gray-700"
                      >
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 ml-5">
                              <img
                                className="w-8 h-8 rounded-full"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt="Neil image"
                              />
                            </div>
                            <div className="flex-1 min-w-0 text-white">
                              <p className="text-sm font-medium truncate">
                                {movie.title}
                              </p>
                            </div>
                            <div onClick={() => selectMovies(movie.title)}>
                              <IoAddCircleOutline className="mr-4 text-2xl text-white" />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      ) : (
        ""
      )}

      <div className="flex flex-row gap-2 flex-wrap mt-4 mb-4 ml-2">
        {savedMovies.map((movie) => {
          return (
            <div
              className="flex flex-row text-sm border-2 border-verdedos border-solid rounded-md items-center p-1"
              onClick={() => deleteArtist(movie)}
            >
              <AiOutlineClose />
              <p>{movie}</p>
            </div>
          );
        })}
      </div>

      <div className={movies ? "flex mt-3 mb-4" : "flex min-h-screen mb-4"}>
        <button
          className="bg-verdecito border-b-8 border-verdedos text-white hover:bg-verdedos  w-48 rounded-full p-3 m-auto"
          type="submit"
          onClick={handleSubmit}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default register3;
