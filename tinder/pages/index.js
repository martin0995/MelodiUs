import Head from "next/head";
import Image from "next/image";
import Imagen from "./Index/Imagen";
import Icon from "./Index/Icon";
import fondo from "../public/bg-img.jpeg";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { login } from "../store/reducers/userSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login({}));

    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    setIsLoading(false);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    signIn("google", { callbackUrl: "/espera" });
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
              <h6 className="text-verdespotify text-lg"> MelodiUs</h6>
            </div>
            <div className="italic text-4xl font-bold text-center flex justify-center m-auto w-3/4 h-[20%]">
              <h1>Bienvenido a MelodiUs</h1>
            </div>
            <div className="flex flex-col mb-28 gap-4">
              <button
                onClick={handleLogin}
                className="border-green-600 bg-green-600 text-black  border-2 p-2 text-xl rounded-full w-80 m-auto"
              >
                Crear cuenta
              </button>
              <button
                onClick={handleLogin}
                className=" flex gap-2 justify-center items-center border-green-600 border-2 p-2 text-xl rounded-full w-80 m-auto"
              >
                Ingresar
                <FcGoogle />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
