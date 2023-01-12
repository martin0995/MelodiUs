import React from "react";
import Cruz from "./cruz.js";

export default function Register() {
  return (
    <div>
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
