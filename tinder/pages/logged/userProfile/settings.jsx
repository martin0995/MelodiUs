import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../components/Navbar";
import Icon from "../../Index/Icon";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import UserSettings from "../../../components/UserSettings";
import { signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useRouter } from "next/router";
import Preferences from "../../../components/Preferences";
import Swal from "sweetalert2";

const settings = () => {
  const user = useSelector((state) => state.user);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    signOut({ callbackUrl: "/" });
  };

  const handleDelete = async () => {
    try {
      Swal.fire({
        title: "TinderMusic",
        text: "Estas seguro que quieres eliminar tu cuenta?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar cuenta",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.value) {
          const usuariodelete = axios.delete(
            `/api/userId/${session.user.email}`,
            {
              email: session.user.email,
            }
          );

          return router.push("/");
        }
      });

      // const usuariodelete = axios.delete(`/api/userId/${session.user.email}`, {
      //   email: session.user.email,
      // });

      // dispatch(login({}));

      // return router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "authenticated") {
    return (
      <div className="flex flex-col bg-black text-white ">
        <div className="flex text-verdespotify  items-center mb-4">
          <div className="p-2 h-8 flex mx-auto gap-1 text-green-500">
            <Icon />
            <h6> tinderMusic</h6>
          </div>
        </div>
        <div>
          <UserSettings />
        </div>
        <div>
          <Preferences />
        </div>
        <div className=" mt-4 text-center ">
          {" "}
          <button
            onClick={handleLogout}
            className="border-green-600 bg-green-600 text-black  border-2 p-2 text-xl rounded-full w-3/5 m-auto"
          >
            Cerrar sesion
          </button>
        </div>
        <div className=" border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 mt-4"></div>
        <div className="pb-14 mt-4 text-center ">
          {" "}
          <button
            onClick={handleDelete}
            className="border-red-600 bg-red-600 text-black  border-2 p-2 text-xl rounded-full w-3/5 m-auto"
          >
            Eliminar cuenta
          </button>
        </div>

        <Navbar className="fixed"></Navbar>
      </div>
    );
  }
};

export default settings;
