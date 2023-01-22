import React from "react";
import Icon from "../Index/Icon";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import Image from "next/image";
import styles from "./userProfile.module.css";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const userProfile = () => {
  const user = useSelector((state) => state.user);
  const { data: session, status } = useSession();

  useEffect(() => {

    
  }, [session]);

  if (status === "authenticated") {
    return (
      <div className="text-black h-screen flex flex-col justify-between w-full items-center pt-6 ">
        <div className="flex text-verdedos  items-center ">
          <div className="p-2 h-8 flex mx-auto gap-1 ">
            <Icon />
            <h6> tinderMusic</h6>
          </div>
        </div>
        <div className="flex flex-col h-screen items-start mt-5">
          <Image
            src={user.images[0]}
            alt="User main photo"
            width={200}
            height={200}
            className={`rounded-full ${styles.photoContainer}`}
          />
          <p className="text-3xl text-center">
            {user.name}, {user.birthday}
          </p>
        </div>

        <Navbar></Navbar>
      </div>
    );
  }
};

export default userProfile;
