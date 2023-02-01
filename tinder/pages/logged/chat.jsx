import React from "react";
import { useSession } from "next-auth/react";
import Icon from "../Index/Icon";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect } from "react";
// import { useSelector } from "react-redux";

const chat = () => {
  const { data: session, status } = useSession();
  // const user = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "authenticated") {
      const matches = axios.post("/api/match", { email: session.user.email });
      console.log("MATCHES", matches);
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <div className="h-screen flex flex-grow flex-shrink-0 flex-col w-full items-center justify-end pt-6 bg-black">
        <div className="flex gap-x-3 text-verdedos flex-grow flex-shrink-0 items-center mb-6">
          <div className="p-2 h-8 flex mx-auto gap-1">
            <Icon />
            <h6> tinderMusic</h6>
          </div>
        </div>
        <Navbar></Navbar>
      </div>
    );
  }
};

export default chat;
