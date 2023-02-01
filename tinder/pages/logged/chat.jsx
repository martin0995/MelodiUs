import React from "react";
import { useSession } from "next-auth/react";
import Icon from "../Index/Icon";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

const chat = () => {
  const { data: session, status } = useSession();
  // const user = useSelector((state) => state.user);
  const [matches, setMatches] = useState([]);
  const [update, setUpdate] = useState(false);

  console.log("MATCHES>>", matches.data);

  useEffect(() => {
    if (status === "authenticated") {
      const matches = axios
        .post("/api/match", { email: session.user.email })
        .then((data) => setMatches(data))
        .then(() => setUpdate(true));
    }
  }, [status]);

  useEffect(() => {}, [update]);

  if (status === "authenticated") {
    return (
      <div className="h-screen flex flex-col w-full items-center pt-6 bg-black">
        <div className="flex gap-x-3 text-verdedos items-center mb-6">
          <div className="p-2 h-8 flex mx-auto gap-1">
            <Icon />
            <h6> tinderMusic</h6>
          </div>
        </div>

        <div className="flex flex-row w-full h-1/5">
          {matches.length ? (
            matches.map((match) => {
              return (
                <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div class="flex justify-end px-4 pt-4"></div>
                  <div class="flex flex-col items-center pb-10">
                    <img
                      class="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src={match.user.images[0]}
                      alt="User Image"
                    />
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      {match.user.name}
                    </h5>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-white">NO ENTRO</p>
          )}
        </div>

        <Navbar></Navbar>
      </div>
    );
  }
};

export default chat;
