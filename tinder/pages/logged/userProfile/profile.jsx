import React from "react";
import Icon from "../../Index/Icon";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import Image from "next/image";
import styles from "./userProfile.module.css";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../../store/reducers/userSlice";
import handleInput from "../../../reactHooks/handleInput";
import { CiEdit } from "react-icons/ci";

const userProfile = () => {
  const user = useSelector((state) => state.user);
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [info, setInfo] = useState(false);
  const description = handleInput();
  const [valor, setValor] = useState(user.description);
  console.log(user);
  const handleClick = (path) => {
    router.push(`/logged/userProfile/${path}`);
  };

  const handleInfo = () => {
    setInfo(!info);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDb = await axios.put("/api/settings", {
        email: user.email,
        description: description.value,
      });
      console.log(userDb);
      setValor(userDb.data.description);
    } catch (error) {
      console.log(error);
    }
    setInfo(!info);
  };

  useEffect(() => {
    setValor(user.description);
  }, [user]);

  useEffect(() => {}, [session, valor, info]);

  if (status === "authenticated") {
    return (
      <div className="flex flex-col text-white justify-between h-screen  w-full items-center pt-6 bg-black">
        <div className="flex text-verdecito  items-center ">
          <div className="p-2 h-8 flex mx-auto gap-1 ">
            <Icon />
            <h6> tinderMusic</h6>
          </div>
        </div>
        <div className="flex flex-col items-start mt-5">
          <Image
            src={user.images[0]}
            alt="User main photo"
            width={200}
            height={200}
            className={`rounded-full ${styles.photoContainer}`}
          />

          <p className="text-3xl text-center mx-auto mt-2">
            {user.name}, {user.birthday}
          </p>
        </div>

        <div className="flex flex-col justify-center items-center w-screen">
          {user.description && !info ? (
            <div>
              <p>{valor}</p>
              <CiEdit onClick={handleInfo} />
            </div>
          ) : info ? (
            <form
              className="flex flex-col items-center gap-4"
              onSubmit={handleSubmit}
            >
              <input
                className="h-12 bg-transparent p-2 outline-0 border-b-2 w-60"
                type="text"
                placeholder="Sobre mí.."
                {...description}
              ></input>
              <button
                className="border-2 rounded-full p-3 flex items-center justify-center text-md w-2/5 bg-verdecito"
                type="submit"
              >
                Guardar
              </button>
            </form>
          ) : (
            <button
              className="border-2 rounded-full p-3 flex items-center justify-center text-xl w-2/5 bg-verdecito"
              onClick={handleInfo}
            >
              Sobre mí
            </button>
          )}
        </div>

        <div className="flex flex-row justify-between w-4/5 h-1/5">
          <button
            className="border-2 rounded-full w-2/5 p-3 flex items-center justify-center text-xl h-2/5"
            onClick={() => handleClick("info")}
          >
            Perfil
          </button>
          <button className="border-2 rounded-full w-2/5 p-3 flex items-center justify-center text-xl h-2/5">
            Ajustes
          </button>
        </div>

        <Navbar></Navbar>
      </div>
    );
  }
};

export default userProfile;
