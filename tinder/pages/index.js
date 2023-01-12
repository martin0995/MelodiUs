import Head from "next/head";
import Image from "next/image";
import Imagen from "./Index/Imagen";
import Icon from "./Index/Icon";
import fondo from "../public/bg-img.jpeg";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  // console.log(session);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    setIsLoading(false);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    console.log("ingresando con Gmail");
    await signIn();
    await axios.post("/api/newUser", {
      email: session.user.email,
    });
  };

  return (
    <>
      {!isLoading ? (
        <Imagen />
      ) : (
        <>
          <div className="text-white  h-screen flex flex-col justify-between bg-fondito bg-center bg-no-repeat">
            <div className="p-2 h-8 flex justify-center gap-1">
              <Icon />
              <h6> tinderMusic</h6>
            </div>
            <div className="italic text-4xl font-bold text-center flex justify-center items-center m-auto ">
              <h1>Bienvenido a tinderMusic</h1>
            </div>
            <div className="flex flex-col mb-28 gap-4">
              <button
                onClick={() => handleLogin()}
                className="border-green-600 bg-green-600 text-black  border-2 p-2 text-xl rounded-full w-80 m-auto"
              >
                Crear cuenta
              </button>
              <button
                onClick={handleLogin()}
                className="border-green-600 border-2 p-2 text-xl rounded-full w-80 m-auto"
              >
                Iniciar sesion
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
