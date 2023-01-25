import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../components/Navbar";
import Icon from "../../Index/Icon";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import UserSettings from "../../../components/UserSettings";

const settings = () => {
  const user = useSelector((state) => state.user);
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="flex flex-col bg-black text-white h-screen">
        <div className="flex text-green-500  items-center mb-4">
          <div className="p-2 h-8 flex mx-auto gap-1 text-green-500">
            <Icon />
            <h6> tinderMusic</h6>
          </div>
        </div>
        <div>
          <UserSettings />
        </div>
        <div>
          <UserSettings />
        </div>

        <Navbar className="fixed"></Navbar>
      </div>
    );
  }
};

export default settings;
