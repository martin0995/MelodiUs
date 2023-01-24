import React from "react";
import Icon from "../../Index/Icon";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import Image from "next/image";
import styles from "./userProfile.module.css";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const userProfile = () => {
  const user = useSelector((state) => state.user);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClick = (path) => {
    router.push(`/logged/userProfile/${path}`);
  };

  useEffect(() => {}, [session]);

  if (status === "authenticated") {
    return (
      <div className="text-white justify-between h-screen flex flex-col w-full items-center pt-6 bg-black">
        <div className="flex text-verdedos  items-center ">
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
        <div className="flex flex-row justify-between w-4/5">
          <button
            className="border-2 rounded-full w-2/5 p-3 flex items-center justify-center text-xl"
            onClick={() => handleClick("info")}
          >
            Perfil
          </button>
          <button className="border-2 rounded-full w-2/5 p-3 flex items-center justify-center text-xl">
            Ajustes
          </button>
        </div>

        <Navbar></Navbar>
      </div>
    );
  }
};

export default userProfile;
