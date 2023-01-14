import React from "react";
import { useRouter } from "next/router";

const register2 = () => {
  const router = useRouter();
  const Nextpage = (event) => {
    event.preventDefault();

    router.push("/register/register");
  };
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
