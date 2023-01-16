import React, { useEffect, useState, useRef } from "react";
import Cruz from "./cruz.js";
import Icon from "../Index/Icon.js";
import handleInput from "../../reactHooks/handleInput";
import { useRouter } from "next/router";
import { setForm } from "../../store/reducers/formsSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSession } from "next-auth/react";
export default function Register() {
  const { data: session } = useSession();
  const router = useRouter();
  const [genero, setinputGenero] = useState("");
  const [buscargenero, setinputBuscarGenero] = useState("");

  //tu genero//
  const generohombre = useRef("generohombre");
  const generomujer = useRef("generomujer");
  const otro = useRef("otro");
  //genero buscado//
  const generohombres = useRef("generoSearchhombres");
  const generomujeres = useRef("generoSearchmujeres");
  const ambos = useRef("ambos");
  const nombre = handleInput();
  const fecha = handleInput();
  const dispatch = useDispatch();
  let rojito = "bg-rojito text-white text-base  w-48 rounded-full p-3";
  let verde =
    "bg-verdecito text-white text-base border-b-4 border-verdedos w-48 rounded-full p-3";

  const handleGenreButton = (event) => {
    event.preventDefault();

    const elemento = document.getElementById(event.target.id);

    if (elemento.getAttribute("class") === verde) {
      elemento.setAttribute("class", rojito);
    } else {
      elemento.setAttribute("class", verde);
    }

    setinputGenero(event.target.value);
  };
  const handleSearchGenre = (event) => {
    event.preventDefault();
    const elemento = document.getElementById(event.target.id);

    if (elemento.getAttribute("class") === verde) {
      elemento.setAttribute("class", rojito);
    } else {
      elemento.setAttribute("class", verde);
    }

    setinputBuscarGenero(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //tu genero
    let generohombredata = generohombre.current.className;
    let generomujerdata = generomujer.current.className;
    let generootrodata = otro.current.className;
    let arraygenero = [generohombredata, generomujerdata, generootrodata]
      .map((value) => value == rojito)
      .filter(Boolean).length;
    if (arraygenero > 1) return alert("no podes seleccionar mas de un genero ");
    if (arraygenero == 0) return alert("tienes que seleccionar tu genero");

    //generos buscados
    let generohombresdata = generohombres.current.className;
    let generomujeresdata = generomujeres.current.className;
    let generoambos = ambos.current.className;

    if (
      generoambos == rojito &&
      (generohombresdata == rojito || generomujeresdata == rojito)
    ) {
      return alert("no podes seleccionar ambos y algo mas ");
    }
    if (
      generoambos == verde &&
      generohombredata == verde &&
      generomujeresdata == verde
    )
      return alert("tienes que seleccionar el/los generos que buscas");
    console.log("buscar", buscargenero);
    axios.put("/api/newUser", {
      email: session.user.email,
      name: nombre,
      birthday: fecha,
      genre: genero,
      searchGenre: buscargenero,
    });
    router.push("/register/register2");
  };

  // search();

  return (
    <div className="bg-white text-black h-screen">
      <div className="flex flex-row text-verdedos">
        <div className="fixed text-black">
          <button className="p-2">
            <Cruz />
          </button>
        </div>
        <div className="p-2 h-8 flex mx-auto gap-1">
          <Icon />
          <h6> tinderMusic</h6>
        </div>
      </div>
      <div className="flex flex-col text-2xl m-6 ">
        <h2 className="mb-8">Necesitamos tu información</h2>
        <form className="flex flex-col text-xl gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <p>Nombre</p>
            <input
              className="h-12 bg-transparent p-2 outline-0 border-b-2 w-60"
              type="text"
              {...nombre}
              placeholder="Ingresa tu nombre.."
            ></input>
            <p className="text-sm ml-2">Así es como se verá en tu perfil</p>
          </div>

          <div className="flex flex-col gap-1">
            <p>Fecha de nacimiento</p>
            <div class="flex items-center justify-center">
              <div class="flex items-center justify-center"></div>
            </div>
            <input
              className="h-12 bg-transparent p-2 outline-0 border-b-2 w-60"
              type="date"
              {...fecha}
            ></input>
          </div>

          <div className="flex flex-col gap-4">
            <p>Genero</p>
            <div className="flex flex-row gap-6">
              <button
                id="genero-hombre"
                className="bg-verdecito text-white text-base border-b-4 border-verdedos w-48 rounded-full p-3"
                onClick={handleGenreButton}
                value="hombre"
                ref={generohombre}
              >
                Hombre
              </button>
              <button
                id="genero-mujer"
                className="bg-verdecito text-white text-base border-b-4 border-verdedos w-48 rounded-full p-3"
                onClick={handleGenreButton}
                value="mujer"
                ref={generomujer}
              >
                Mujer
              </button>
              <button
                id="genero-otro"
                className="bg-verdecito text-white text-base border-b-4 border-verdedos w-48 rounded-full p-3"
                onClick={handleGenreButton}
                value="otro"
                ref={otro}
              >
                Otro
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p>Qué buscás?</p>
            <div className="flex flex-row gap-6">
              <button
                id="mostrar-hombres"
                className="bg-verdecito text-white text-base border-b-4 border-verdedos w-48 rounded-full p-3"
                onClick={handleSearchGenre}
                value="hombres"
                ref={generohombres}
              >
                Hombres
              </button>
              <button
                id="mostrar-mujeres"
                className="bg-verdecito text-white text-base border-b-4 border-verdedos w-48 rounded-full p-3"
                onClick={handleSearchGenre}
                value="mujeres"
                ref={generomujeres}
              >
                Mujeres
              </button>
              <button
                id="mostrar-ambos"
                className="bg-verdecito text-white text-base border-b-4 border-verdedos w-48 rounded-full p-3"
                onClick={handleSearchGenre}
                value="ambos"
                ref={ambos}
              >
                Ambos
              </button>
            </div>
          </div>
          <button
            className="bg-verdecito border-b-8 border-verdedos text-white hover:bg-verdedos  w-48 rounded-full p-3 m-auto mt-12"
            type="submit"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
