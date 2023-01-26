import React from "react";
import Navbar from "../../components/Navbar";
import Icon from "../Index/Icon";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useGeolocation from "../../reactHooks/useGeolocation";

const chat = () => {
  const { data: session, status } = useSession();
  const { location, place } = useGeolocation();

  const hanldeLocation = async () => {
    console.log("LOCATION", location);
    console.log("PLACE", place);
  };

  if (status === "authenticated") {
    return (
      <div className="text-black h-screen flex flex-grow flex-shrink-0 flex-col w-full items-center justify-end pt-6">
        <div className="flex gap-x-3 text-verdedos flex-grow flex-shrink-0 items-center mb-6">
          <div className="p-2 h-8 flex mx-auto gap-1">
            <Icon />
            <h6> tinderMusic</h6>
          </div>
          <div>
            <button onClick={hanldeLocation}>GEOLOCATION</button>
          </div>
        </div>
        <Navbar></Navbar>
      </div>
    );
  }
};

export default chat;
