import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import handleInput from "../../reactHooks/handleInput";
import Icon from "../Index/Icon";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";

const register3 = () => {
  const user = useSelector((state) => state.user);

  if (user.artists) {
    var art = [...user.artists];
    var redux = true;
  }

  const { data: session } = useSession();

  let SPOTIFY_CLIENT_ID = "8136e40ba3434c3e9c493fd8cb7a4aa8";
  let SPOTIFY_CLIENT_SECRET = "ea73769123aa41d8b139ee20ee18fff8";
  const router = useRouter();
  const [accessToken, setAccessToken] = useState();
  const searchedArtist = handleInput();
  const [artists, setArtists] = useState([]);
  const [savedArtist, setsavedArtist] = useState(art || []);
  const [deleted, setDeleted] = useState(false);

  const Nextpage = (event) => {
    event.preventDefault();
    if (redux) {
      router.push("/logged/userProfile/info");
    } else if (!redux) {
      router.push("/register/register2");
    }
  };

  useEffect(() => {
    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        SPOTIFY_CLIENT_ID +
        "&client_secret=" +
        SPOTIFY_CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      search();
    }, 500);
  }, [searchedArtist.value]);

  useEffect(() => {}, [savedArtist, deleted]);

  const selectArtist = (artist) => {
    // Limit up to 5 artists to choose
    if (savedArtist.length < 5) {
      if (savedArtist.includes(artist)) {
        return alert(`Ya tenes agregado a ${artist}`);
      }
      setsavedArtist([...savedArtist, artist]);
    } else {
      return alert("No se puede agregar mas de 5 artistas");
    }
  };

  const deleteArtist = (artist) => {
    const index = savedArtist.indexOf(artist);
    savedArtist.splice(index, 1);
    setDeleted(!deleted);
  };

  async function search() {
    if (accessToken) {
      let artistParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
      let artistID = await fetch(
        "https://api.spotify.com/v1/search?q=" +
          searchedArtist.value +
          "&type=artist",
        artistParameters
      )
        .then((result) => result.json())
        .then((data) => setArtists(data));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (savedArtist.length !== 5) {
      return alert("Por favor, seleccionar 5 artistas.");
    }

    if (redux) {
      await axios.put("/api/newUser3", {
        artist: savedArtist,
        email: session.user.email,
        movies: user.movies,
      });

      router.push("/logged/userProfile/info");
    } else if (!redux) {
      await axios.put("/api/newUser", {
        email: session.user.email,
        name: user.name,
        birthday: user.birthday,
        genre: user.genre,
        searchGenre: user.searchGenre,
      });
      await axios.put("/api/newUser3", {
        artist: savedArtist,
        email: session.user.email,
        movies: user.movies,
      });

      router.push("/logged/home");
    }
  };

  return (
    <div className="bg-white text-black h-screen">
      <div className="flex flex-row text-verdedos">
        <div className="text-black">
          <button className="p-2 text-2xl ml-2" onClick={Nextpage}>
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
          <p>Agrega artista de spotify</p>
          <input
            className="h-12 bg-transparent p-2 outline-0 border-b-2 w-60"
            type="text"
            placeholder="Ingresar artista..."
            {...searchedArtist}
          ></input>
        </div>
      </div>

      {searchedArtist.value ? (
        <div>
          {artists.artists
            ? artists.artists.items.slice(0, 5).map((artist) => {
                return (
                  <div className="w-full max-w-md p-1 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 dark:divide-gray-700"
                      >
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 ml-5">
                              {artist.images[0] ? (
                                <img
                                  className="w-8 h-8 rounded-full"
                                  src={artist.images[0].url}
                                  alt="Neil image"
                                />
                              ) : (
                                <Icon />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {artist.name}
                              </p>
                            </div>
                            <div onClick={() => selectArtist(artist.name)}>
                              <IoAddCircleOutline className="mr-4 text-2xl" />
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
        {savedArtist.map((artist) => {
          return (
            <div
              className="flex flex-row text-sm border-2 border-verdedos border-solid rounded-md items-center p-1"
              onClick={() => deleteArtist(artist)}
            >
              <AiOutlineClose />
              <p>{artist}</p>
            </div>
          );
        })}
      </div>

      <div
        className={
          artists.artists ? "flex mt-3 mb-4" : "flex min-h-screen mb-4"
        }
      >
        <button
          className="bg-verdecito border-b-8 border-verdedos text-white hover:bg-verdedos  w-48 rounded-full p-3 m-auto"
          type="submit"
          onClick={handleSubmit}
        >
          Finalizar
        </button>
      </div>
    </div>
  );
};

export default register3;
