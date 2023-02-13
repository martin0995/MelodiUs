import React, { useEffect, useState, useRef } from "react";
import Cruz from "./cruz.js";
import Icon from "../Index/Icon.js";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { login } from "../../store/reducers/userSlice";
import axios from "axios";
import registerData from "../../reactHooks/registerData.js";
import { toast } from "react-toastify";

export default function Register() {
  const user = useSelector((state) => state.user);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [genero, setinputGenero] = useState(user.genre);
  const [buscargenero, setinputBuscarGenero] = useState(user.searchGenre);
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState(user.name);
  const [fecha, setFecha] = useState(user.birthday);
  const data = router.query;

  useEffect(() => {
    if (status === "authenticated") {
      registerData(session.user.email, dispatch);
    }
  }, [status]);

  useEffect(() => {
    setNombre(user.name);
    setinputGenero(user.genre);
    setinputBuscarGenero(user.searchGenre);
    setFecha(user.birthday);
  }, [user]);

  //condicion para saber si estamen en register o desde settings

  // ESTILO (ROJO / VERDE):
  let rojito = "bg-verdedos text-white text-base  w-48 rounded-full p-3";

  let verde =
    "bg-verdecito text-white text-base border-b-4 border-verdedos w-48 rounded-full p-3";

  const handleGenreButton = (event) => {
    event.preventDefault();
    setinputGenero(event.target.value);
  };

  const handleSearchGenre = (event) => {
    event.preventDefault();
    setinputBuscarGenero(event.target.value);

    // const elemento = document.getElementById(event.target.id);

    // if (elemento.getAttribute("class") === verde) {
    //   elemento.setAttribute("class", rojito);
    // } else {
    //   elemento.setAttribute("class", verde);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let letters = /^[A-Za-z]{3,10}$/;
    if (!nombre.match(letters)) {
      return toast.warn("Su nombre debe contener solo letras", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    await axios.put("/api/newUser", {
      email: session.user.email,
      name: nombre,
      birthday: new Date(fecha),
      genre: genero,
      searchGenre: buscargenero,
      isAdmin: "",
    });

    if (data.settings == "true") {
      return router.push("/logged/userProfile/settings");
    }

    const loggedUser = {
      name: nombre,
      email: session.user.email,
      birthday: fecha,
      genre: genero,
      searchGenre: buscargenero,
      isAdmin: "",
    };

    dispatch(login(loggedUser));

    return router.push("/register/register2");
  };

  const handleNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleDate = (e) => {
    setFecha(e.target.value);
  };

  // search();

  return (
    <div className="bg-black text-white h-screen">
      <div className="flex flex-row text-verdespotify">
        <div className="text-black">
          <button className="p-2">
            <Cruz />
          </button>
        </div>
        <div className="p-2 h-8 flex gap-1 w-3/4 flex justify-center around ">
          <Icon />
          <h6> tinderMusic</h6>
        </div>
      </div>

      <div className="flex flex-col text-2xl m-6 ">
        <h2 className="mb-8 font-bold uppercase text-xl text-center">
          Necesitamos tu información
        </h2>
        <form className="flex flex-col text-lg  gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <p className="text-lg font-bold uppercase">Nombre</p>
            <input
              className="h-10 bg-transparent p-2 text-base outline-0 border-b-2 w-60"
              type="text"
              onChange={handleNombre}
              placeholder="Ingresa tu nombre.."
              value={nombre}
            ></input>
            <p className="text-sm ml-2 ">Así es como se verá en tu perfil</p>
          </div>

          <div className="flex flex-col ">
            <p className="text-lg font-bold uppercase">Fecha de nacimiento</p>
            <div class="flex items-center justify-center">
              <div class="flex items-center justify-center"></div>
            </div>
            <input
              className="h-10 bg-transparent p-2 outline-0 border-b-2 w-60 text-base"
              type="date"
              onChange={handleDate}
              value={fecha}
            ></input>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold uppercase">Genero</p>
            <div className="flex flex-row gap-2">
              <button
                id="genero-hombre"
                className={genero === "hombre" ? rojito : verde}
                onClick={handleGenreButton}
                value="hombre"
              >
                Hombre
              </button>
              <button
                id="genero-mujer"
                className={genero === "mujer" ? rojito : verde}
                onClick={handleGenreButton}
                value="mujer"
              >
                Mujer
              </button>
              <button
                id="genero-otro"
                className={genero === "otro" ? rojito : verde}
                onClick={handleGenreButton}
                value="otro"
              >
                Otro
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold uppercase">Qué buscás?</p>
            <div className="flex flex-row gap-2">
              <button
                id="mostrar-hombres"
                className={buscargenero === "hombres" ? rojito : verde}
                onClick={handleSearchGenre}
                value="hombres"
              >
                Hombres
              </button>
              <button
                id="mostrar-mujeres"
                className={buscargenero === "mujeres" ? rojito : verde}
                onClick={handleSearchGenre}
                value="mujeres"
              >
                Mujeres
              </button>
              <button
                id="mostrar-ambos"
                className={buscargenero === "ambos" ? rojito : verde}
                onClick={handleSearchGenre}
                value="ambos"
              >
                Ambos
              </button>
            </div>
          </div>
          <button
            className="bg-verdespotify border-b-8 border-verdedos text-white hover:bg-verdedos  w-48 rounded-full p-3 m-auto mt-12"
            type="submit"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
