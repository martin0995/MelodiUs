import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import handleInput from "../../reactHooks/handleInput";

const register3 = () => {
  const { data: session } = useSession();
  let SPOTIFY_CLIENT_ID = "8136e40ba3434c3e9c493fd8cb7a4aa8";
  let SPOTIFY_CLIENT_SECRET = "ea73769123aa41d8b139ee20ee18fff8";
  const router = useRouter();
  const [accessToken, setAccessToken] = useState();
  const searchedArtist = handleInput();
  const [artists, setArtists] = useState([]);

  const Nextpage = (event) => {
    event.preventDefault();

    router.push("/register/register2");
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

    search();
  }, []);

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

  useEffect(() => {}, [artists]);

  return (
    <div className="bg-white text-black h-screen">
      <div className="flex flex-row text-verdedos">
        <div className="fixed text-black">
          <button className="p-2" onClick={Nextpage}>
            Volver atras
          </button>
        </div>
        <div className="p-2 h-8 flex mx-auto gap-1">
          <h6> tinderMusic</h6>
        </div>
      </div>

      <div className="flex flex-col text-2xl m-6">
        <div className="flex flex-col gap-1">
          <p>Agrega artista de spotify</p>
          <input
            className="h-12 bg-transparent p-2 outline-0 border-b-2 w-60"
            type="text"
            placeholder="Ingresar artista..."
            {...searchedArtist}
          ></input>
        </div>
        <button onClick={search}>Buscar</button>
      </div>

      {searchedArtist.value ? (
        <div>
          {artists.artists
            ? artists.artists.items.slice(0, 5).map((artist) => {
                console.log(artist);
                <div>
                  <h1>HOLAAAA</h1>
                  <p>{artist.name}</p>
                </div>;
              })
            : ""}
        </div>
      ) : (
        ""
      )}

      <div className="flex min-h-screen">
        <button
          className="bg-verdecito border-b-8 border-verdedos text-white hover:bg-verdedos  w-48 rounded-full p-3 m-auto"
          type="submit"
        >
          Enviar datos
        </button>
      </div>
    </div>
  );
};

export default register3;
