import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cruz from "./cruz.js";
import Icon from "../Index/Icon.js";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";

const register2 = () => {
  const { data: session } = useSession();
  let SPOTIFY_CLIENT_ID = "8136e40ba3434c3e9c493fd8cb7a4aa8";
  let SPOTIFY_CLIENT_SECRET = "ea73769123aa41d8b139ee20ee18fff8";
  const router = useRouter();
  const [accessToken, setAccessToken] = useState();
  const [image, setimage] = useState("");
  const [imagenes, setImagenes] = useState("");
  const Nextpage = (event) => {
    event.preventDefault();

    router.push("/register/register");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put("/api/newUser2", {
      imagenes: imagenes,
      email: session.user.email,
    });
  };
  const submitImage = (e) => {
    e.preventDefault();
    console.log("entro");
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "xwz9qlxn");
    data.append("cloud_name", "dnieujc6g");
    fetch("https://api.cloudinary.com/v1_1/dnieujc6g/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setImagenes(data.url));
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
    <div className="bg-white text-black h-screen">
      <div className="flex flex-row text-verdedos">
        <div className="fixed text-black">
          <button className="p-2" onClick={Nextpage}>
            Volver atras
          </button>
        </div>
        <div className="p-2 h-8 flex mx-auto gap-1">
          <Icon />
          <h6> tinderMusic</h6>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col text-xl gap-6">
        <div className="flex flex-col text-1xl m-6 gap-6 ">
          <p>Cargar fotos</p>
          <input
            type="file"
            onChange={(e) => {
              setimage(e.target.files[0]);
            }}
          ></input>
          <button onClick={submitImage}>Upload</button>
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          ></input>
          <button onClick={submitImage}>Upload</button>
        </div>
        <div className="flex flex-col text-2xl m-6 ">
          <div className="flex flex-col gap-1">
            <p>Agrega artista de spotify</p>
            <input
              className="h-12 bg-transparent p-2 outline-0 border-b-2 w-60"
              type="text"
              placeholder="Ingresa tu nombre.."
            ></input>
          </div>
          <button
            className="bg-verdecito border-b-8 border-verdedos text-white hover:bg-verdedos  w-48 rounded-full p-3 m-auto mt-12"
            type="submit"
          >
            Enviar datos
          </button>
        </div>
      </form>
    </div>
  );
};

export default register2;
