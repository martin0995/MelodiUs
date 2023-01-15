import React, { useEffect, useState } from "react";
import Cruz from "./cruz.js";
import Icon from "../Index/Icon.js";
import handleInput from "../../reactHooks/handleInput";
import { useRouter } from "next/router";
import { setForm } from "../../store/reducers/formsSlice";
import { useDispatch } from "react-redux";

export default function Register() {
  const router = useRouter();
  const [generoActivado, setGeneroActivado] = useState(false);
  const [genero, setinputGenero] = useState("");
  const [buscargenero, setinputBuscarGenero] = useState("");
  const [botonSeleccionado, setBotonSeleccionado] = useState(
    "bg-verdecito text-white text-base border-b-4 border-verdedos w-48 rounded-full p-3"
  );
  const nombre = handleInput();
  const fecha = handleInput();
  const dispatch = useDispatch();

  const handleGenreButton = (event) => {
    event.preventDefault();
    const elementoHombre = document.getElementById("genero-hombre");
    const elementoMujer = document.getElementById("genero-mujer");
    const elementoOtro = document.getElementById("genero-otro");
    const elemento = document.getElementById(event.target.id);

    if (!generoActivado) {
      if (
        elemento.getAttribute("class") ===
        "bg-verdecito text-white text-base border-b-4 border-verdedos w-48 rounded-full p-3"
      ) {
        elemento.setAttribute(
          "class",
          "bg-rojito text-white text-base  w-48 rounded-full p-3"
        );
        setGeneroActivado(true);
      }
    }

    setinputGenero(event.target.value);
  };
  const handleSearchGenre = (event) => {
    event.preventDefault();

    setinputBuscarGenero(event.target.value);
  };
  const Nextpage = (event) => {
    event.preventDefault();

    router.push("/register/register2");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/NewUser", {
      name: nombre,
      birthday: fecha,
      genre: genero,
      searchGenre: buscargenero,
    });
  };

  // search();
  console.log(genero);
  console.log(fecha);
  console.log(nombre);

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
              >
                Hombre
              </button>
              <button
                id="genero-mujer"
                className="bg-verdecito text-white text-base border-b-4 border-verdedos w-48 rounded-full p-3"
                onClick={handleGenreButton}
                value="mujer"
              >
                Mujer
              </button>
              <button
                id="genero-otro"
                className="bg-verdecito text-white text-base border-b-4 border-verdedos w-48 rounded-full p-3"
                onClick={handleGenreButton}
                value="otro"
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
              >
                Hombres
              </button>
              <button
                className={botonSeleccionado}
                onClick={handleSearchGenre}
                value="mujeres"
              >
                Mujeres
              </button>
              <button
                className={botonSeleccionado}
                onClick={handleSearchGenre}
                value="ambos"
              >
                Ambos
              </button>
            </div>
          </div>
          <button
            className="bg-verdecito border-b-8 border-verdedos text-white hover:bg-verdedos  w-48 rounded-full p-3 m-auto mt-12"
            type="submit"
            onClick={Nextpage}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
