import React, { useEffect, useState } from "react";
import Cruz from "./cruz.js";
import handleInput from "../../reactHooks/handleInput";
import { useRouter } from "next/router";

import { setForm } from "../../store/reducers/formsSlice";
import { useDispatch } from "react-redux";
export default function Register() {
  const router = useRouter();

  const [genero, setinputGenero] = useState("");
  const [buscargenero, setinputBuscarGenero] = useState("");
  const nombre = handleInput();
  const fecha = handleInput();
  const dispatch = useDispatch();
  const handleGenreButton = (event) => {
    event.preventDefault();

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
    <div className="bg-white-900">
      <div>
        <Cruz />
      </div>
      <div>
        <h2>Mi nombre es</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            {...nombre}
            placeholder="Ingresa tu nombre.."
          ></input>
          <p>Así es como se verá en tu perfil</p>
          <p>Ingresa tu fecha de nacimiento</p>
          <input type="date" {...fecha}></input>
          <div>
            <p>Genero</p>
            <button onClick={handleGenreButton} value="hombre">
              Hombre
            </button>
            <button onClick={handleGenreButton} value="mujer">
              Mujer
            </button>
            <button onClick={handleGenreButton} value="otro">
              Otro
            </button>
          </div>
          <div>
            <p>Mostrar</p>
            <button onClick={handleSearchGenre} value="hombres">
              Hombres
            </button>
            <button onClick={handleSearchGenre} value="mujeres">
              Mujeres
            </button>
            <button onClick={handleSearchGenre} value="ambos">
              Ambos
            </button>
          </div>
          <button>Enviar</button>
        </form>
        <button onClick={Nextpage}>Continue</button>
      </div>
    </div>
  );
}
