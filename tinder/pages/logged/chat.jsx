import React from "react";
import Navbar from "../../components/Navbar";
import Icon from "../Index/Icon";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useGeolocation from "../../reactHooks/useGeolocation";

const chat = () => {
  const { data: session, status } = useSession();
  const { location, place } = useGeolocation();

  const getDistance = (lat1, lon1, lat2, lon2, unit) => {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    }
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") {
      dist = dist * 1.609344;
    }
    if (unit === "N") {
      dist = dist * 0.8684;
    }
    return dist;
  };

  const latitude = -38.9421494;
  const longitude = -68.051488;
  const latitude2 = -34.5736103;
  const longitude2 = -58.4686036;

  const hanldeLocation = async () => {
    console.log(
      "DISTANCIA",
      getDistance(latitude, longitude, latitude2, longitude2, "K")
    );
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
