import React from "react";
import Navbar from "../../components/Navbar";
import Icon from "../Index/Icon";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const chat = () => {
  const { data: session, status } = useSession();
  const [mensen, setMensen] = useState([]);
  const [location, setLocation] = useState();

  // const fetchApiData = async (location) => {
  //   const res = await fetch(
  //     `https://openmensa.org/api/v2/canteens?near[lat]=${location.latitude}&near[lng]=${location.longitude}&near[dist]=50000`
  //   );
  //   const data = await res.json();
  //   setMensen(data);
  // };

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  const hanldeLocation = async () => {
    // await fetchApiData(location);
    console.log("LOCATION", location);
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
