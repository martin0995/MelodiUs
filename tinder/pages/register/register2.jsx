import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const register2 = () => {
  let SPOTIFY_CLIENT_ID = "8136e40ba3434c3e9c493fd8cb7a4aa8";
  let SPOTIFY_CLIENT_SECRET = "ea73769123aa41d8b139ee20ee18fff8";
  const router = useRouter();
  const [accessToken, setAccessToken] = useState();
  const Nextpage = (event) => {
    event.preventDefault();

    router.push("/register/register");
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
      console.log("que ondaa", accessToken);
      let artistParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
      let artistID = await fetch(
        "https://api.spotify.com/v1/search?q=" + "taylor" + "&type=artist",
        artistParameters
      )
        .then((result) => result.json())
        .then((data) => console.log(data));
    }
  }
  return (
    <div>
      <div>
        <button onClick={Nextpage}>Volver atras</button>
      </div>
      <div>
        <p>Cargar fotos</p>
        <input type="file"></input>
        <input type="file"></input>
      </div>
      <div>
        <p>Vincula tu cuenta de Spotify</p>
        <button>Vincular</button>
      </div>
      <button>Enviar datos</button>
    </div>
  );
};

export default register2;
