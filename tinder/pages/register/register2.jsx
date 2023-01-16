import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cruz from "./cruz.js";
import Icon from "../Index/Icon.js";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";

const register2 = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState();
  const [image, setimage] = useState("");
  const [image2, setimage2] = useState("");
  const [imagenes, setImagenes] = useState("");
  const [imagenes2, setImagenes2] = useState("");
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
  const deleteimage = (event) => {
    event.preventDefault();
    console.log(event);
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
  const submitImage2 = (e) => {
    e.preventDefault();
    console.log("entro");
    const data = new FormData();
    data.append("file", image2);
    data.append("upload_preset", "xwz9qlxn");
    data.append("cloud_name", "dnieujc6g");
    fetch("https://api.cloudinary.com/v1_1/dnieujc6g/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setImagenes2(data.url));
  };

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
      <form onSubmit={handleSubmit} className="flex flex-col text-xl gap-6">
        <div className="flex flex-col text-1xl m-6 gap-6 ">
          <p>Cargar fotos</p>
          <div id="divfile">
            <button
              onClick={deleteimage}
              className={imagenes ? "bg-black absolute" : "hidden"}
            >
              <Cruz />
            </button>
            <IoAddCircleOutline
              className={imagenes ? "hidden" : "text-4xl mt-24 m-auto 	"}
            />
            <input
              type="file"
              className="absolute inset-0 opacity-0 h-full w-full "
              onChange={(e) => {
                setimage(e.target.files[0]);
              }}
            ></input>

            <img
              className={imagenes ? "absolute inset-0 h-full" : "hidden"}
              src={imagenes}
            ></img>
          </div>

          <button onClick={submitImage}>Upload</button>
          <div id="divfile">
            <IoAddCircleOutline
              className={imagenes2 ? "hidden" : "text-4xl mt-24 m-auto 	"}
            />
            <input
              type="file"
              className="absolute inset-0 opacity-0 h-full w-full "
              onChange={(e) => {
                setimage2(e.target.files[0]);
              }}
            ></input>

            <img
              className={imagenes2 ? "absolute inset-0 h-full" : "hidden"}
              src={imagenes2}
            ></img>
          </div>

          <button onClick={submitImage2}>Upload</button>
        </div>
        <div className="flex flex-col text-2xl m-6 ">
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
