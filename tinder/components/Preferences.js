import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import MultiRangeSlider from "./MultiRangeSlider";
import axios from "axios";
import { useSession } from "next-auth/react";
import styles from "./multiRangeSlider.module.css";
import ArtistChoice from "./ArtistChoice";
import MovieChoice from "./MovieChoice";
import { toast } from "react-toastify";

const Preferences = () => {
  const user = useSelector((state) => state.user);
  const { data: session, status } = useSession();
  const [minVal, setMinVal] = useState(18);
  const [maxVal, setMaxVal] = useState(40);
  const [valueDistance, setValueDistance] = useState(user.distance);
  const [toggle, setToggle] = useState(false);
  const [artistSelection, setArtistSelection] = useState(user.artistSelection);
  const [movieSelection, setMovieSelection] = useState(user.movieSelection);

  // Guardando seleccion de artistas:
  const setArtist = (selection) => {
    setArtistSelection(selection);
  };

  // Guardando seleccion de peliculas:
  const setMovie = (selection) => {
    setMovieSelection(selection);
  };

  useEffect(() => {
    setValueDistance(user.distance);
    setArtistSelection(user.artistSelection);
    setMovieSelection(user.movieSelection);
  }, [user]);

  const hanldeDistance = (e) => {
    setValueDistance(e.target.value);
  };

  const handleToggle = (e) => {
    setToggle(e.target.checked);
    if (!e.target.checked) {
      setValueDistance(30);
    }
  };

  const updatePreferences = () => {
    let ageRange = [minVal, maxVal];

    toggle
      ? axios.put("/api/settings", {
          ageRange: ageRange,
          distance: 5000,
          email: session.user.email,
          artistPreference: artistSelection,
          moviePreference: movieSelection,
        })
      : axios.put("/api/settings", {
          ageRange: ageRange,
          distance: valueDistance,
          email: session.user.email,
          artistPreference: artistSelection,
          moviePreference: movieSelection,
        });

    return toast.success("Preferencias actualizadas correctamente", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="w-full max-w-md p-4 bg-black border border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 text-white">
      <div className="text-center">
        {" "}
        <button
          onClick={updatePreferences}
          className="bg-verdecito text-white text-base border-b-4 border-verdedos w-2/6 rounded-full p-3"
        >
          Actualizar
        </button>
      </div>
      <div className="flex items-center justify-between">
        <h5 className="text-md font-bold leading-none dark:text-white uppercase">
          Ubicación
        </h5>
      </div>
      <div className="flow-root">
        <ul role="list">
          <li className="py-1 sm:py-4">
            <div className="flex items-center bg-gray-800 rounded-md h-10">
              <div class="flex-shrink-0 ml-2 text-green-500"></div>
              <div className="flex flex-1 min-w-0 justify-center">
                <p className="text-md font-medium text-white truncate dark:text-white pr-10">
                  {user.city}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between mt-4">
        <h5 className="text-md font-bold leading-none dark:text-white">
          PREFERENCIA DE DISTANCIA
        </h5>
      </div>
      <div className="flex items-center flow-root mt-4 bg-gray-800 rounded-md">
        <ul role="list">
          <li className="py-1 sm:py-4">
            <div className="">
              <div className="flex flex-col flex-1 min-w-0 justify-center items-center">
                <div className="w-full text-center mt-2">
                  <input
                    value={valueDistance}
                    className="w-52 h-1 bg-white rounded outline-none slider-thumb"
                    type="range"
                    min="1"
                    max="101"
                    step="5"
                    onChange={hanldeDistance}
                    list="markers"
                  />
                </div>

                <div className="mt-1">
                  {valueDistance > 1000 ? (
                    <p className="text-white text-center">Global</p>
                  ) : (
                    <p className="text-white text-center">{valueDistance}</p>
                  )}
                </div>

                <div className="flex flex-row gap-2 justify-end w-full">
                  <span className="ml-3 text-sm font-medium text-white dark:text-gray-300">
                    Global
                  </span>
                  {valueDistance > 1000 ? (
                    <label className="relative inline-flex items-center mr-5 cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        onClick={handleToggle}
                        checked
                      />
                      <div className="w-11 h-6 bg-gray-500 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                  ) : (
                    <label className="relative inline-flex items-center mr-5 cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        onClick={handleToggle}
                      />
                      <div className="w-11 h-6 bg-gray-500 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                  )}
                </div>
                <div className="p-2">
                  <p>
                    El modo Global te va a permitir ver gente cerca tuyo y en el
                    resto del mundo
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between mt-4">
        <h5 className="text-md font-bold leading-none dark:text-white">
          PREFERENCIA DE EDAD
        </h5>
      </div>
      <div className="flex items-center flow-root mt-4 bg-gray-800 rounded-md">
        <ul role="list">
          <li className="py-1 sm:py-4">
            <div className="flex flex-1 min-w-0 justify-center mt-4">
              <MultiRangeSlider
                className="w-3/5"
                min={18}
                max={100}
                onChange={({ min, max }) => {
                  setMinVal(min);
                  setMaxVal(max);
                }}
              />
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between mt-4">
        <h5 className="text-md font-bold leading-none dark:text-white">
          COINCIDENCIA DE ARTISTAS
        </h5>
      </div>
      <div className="flex items-center flow-root mt-4 bg-gray-800 rounded-md">
        <ul role="list">
          <li className="py-1 sm:py-4">
            <div className="flex flex-1 min-w-0 justify-center p-2 items-center">
              <ArtistChoice setArtist={setArtist} artist={artistSelection} />
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between mt-4">
        <h5 className="text-md font-bold leading-none dark:text-white uppercase">
          Coincidencia de películas
        </h5>
      </div>
      <div className="flex items-center flow-root mt-4 bg-gray-800 rounded-md">
        <ul role="list">
          <li className="py-1 sm:py-4">
            <div className="flex flex-1 min-w-0 justify-center p-2 items-center">
              <MovieChoice setMovie={setMovie} movie={movieSelection} />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Preferences;
