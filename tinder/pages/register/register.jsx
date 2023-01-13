import React, { useEffect, useState } from "react";
import Cruz from "./cruz.js";
let SPOTIFY_CLIENT_ID = "8136e40ba3434c3e9c493fd8cb7a4aa8";
let SPOTIFY_CLIENT_SECRET = "ea73769123aa41d8b139ee20ee18fff8";
export default function Register() {
  const [searchInput, setSearchInput] = useState();
  const [accessToken, setAccessToken] = useState();
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
  search();

  return (
    <div className="bg-white-900">
      <div>
        <Cruz />
      </div>
      <div>
        <h2>Mi nombre es</h2>
        <form>
          <input type="text" placeholder="Ingresa tu nombre.."></input>
          <p>Así es como se verá en tu perfil</p>
          <p>Ingresa tu fecha de nacimiento</p>
          <input type="date"></input>
          <div>
            <p>Genero</p>
            <button value="hombre">Hombre</button>
            <button value="mujer">Mujer</button>
            <button value="otro">Otro</button>
          </div>
          <div>
            <p>Mostrar</p>
            <button value="hombres">Hombres</button>
            <button value="mujeres">Mujeres</button>
            <button value="ambos">Ambos</button>
          </div>
          <button>Continue</button>
        </form>
      </div>
    </div>
  );
}
