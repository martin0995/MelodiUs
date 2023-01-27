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
import { login, update } from "../store/reducers/userSlice";
import axios from "axios";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSection = (path) => {
    router.push(`${path}`);
  };

  if (status === "authenticated") {
    return (
      <div className="w-full py-3 flex flex-row  justify-around mt-2 text-verdedos fixed bottom-0 z-30 bg-black">
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
            onClick={() => handleSection("/logged/userProfile/profile")}
          />
        </div>
      </div>
    );
  }
};

export default Navbar;
