import React, { useState } from "react";
import Icon from "../pages/Index/Icon";
import { BsFillChatFill } from "react-icons/bs";
import { HiOutlineMusicNote } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ageCalculator from "../reactHooks/ageCalculator";
import { login } from "../store/reducers/userSlice";
import axios from "axios";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSection = (path) => {
    router.push(`${path}`);
  };

  useEffect(() => {
    if (status === "authenticated") {
      const searchUser = async () => {
        const usuario = await axios.post("/api/newUser2", {
          email: session.user.email,
        });

        const userRedux = {
          id: usuario.data._id,
          name: usuario.data.name,
          email: usuario.data.email,
          birthday: ageCalculator(usuario.data.birthday),
          genre: usuario.data.genre,
          searchGenre: usuario.data.searchGenre,
          isAdmin: false,
          images: usuario.data.images,
        };

        dispatch(login(userRedux));
      };
      console.log("CHAU");

      searchUser();
    }
  }, [session]);

  if (status === "authenticated") {
    return (
      <div className="w-full py-3 flex flex-row justify-around mt-2 text-verdedos">
        <div>
          <HiOutlineMusicNote
            className="text-2xl"
            onClick={() => handleSection("/logged/home")}
          />
        </div>
        <div>
          <BsFillChatFill
            className="text-2xl"
            onClick={() => handleSection("/logged/chat")}
          />
        </div>
        <div>
          {" "}
          <CgProfile
            className="text-2xl"
            onClick={() => handleSection("/logged/userProfile")}
          />
        </div>
      </div>
    );
  }
};

export default Navbar;
