import React from "react";
import Icon from "../pages/Index/Icon";
import { BsFillChatFill } from "react-icons/bs";
import { HiOutlineMusicNote } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className="flex flex-row justify-around mt-2 text-verdedos">
      <div>
        <HiOutlineMusicNote className="text-2xl" />
      </div>
      <div>
        <BsFillChatFill className="text-2xl" />
      </div>
      <div>
        {" "}
        <CgProfile className="text-2xl" />
      </div>
    </div>
  );
};

export default Navbar;
