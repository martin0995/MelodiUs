import Head from "next/head";
import Image from "next/image";
import Imagen from "./Index/Imagen";
import Icon from "./Index/Icon";
import fondo from "../public/bg-img.jpeg";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-between bg-fondito">
      {/* <Imagen /> */}      
      <div className="p-2 h-8 flex justify-center gap-1">
        <Icon />
        <h6> tinderMusic</h6>
      </div>
      <div className="italic text-4xl font-bold text-center flex justify-center items-center m-auto ">
        <h1>Bienvenido a tinderMusic</h1>
      </div>
      <div className="flex flex-col mb-28 gap-4">
        <button className="border-green-600 bg-green-600 text-black  border-2 p-2 text-xl rounded-full w-80 m-auto">
          Crear cuenta
        </button>
        <button className="border-green-600 border-2 p-2 text-xl rounded-full w-80 m-auto">
          Iniciar sesion
        </button>
      </div>
    </div>
  );
}
