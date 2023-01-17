import React from "react";
import { useSession, signOut } from "next-auth/react";
import Icon from "../Index/Icon";
import Navbar from "../../components/Navbar";
const home = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="bg-white text-black h-screen">
        <div className="flex flex-row text-verdedos">
          <div className="p-2 h-8 flex mx-auto gap-1">
            <Icon />
            <h6> tinderMusic</h6>
          </div>
          {/* <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button> */}
        </div>
        <div className="m-auto relative p-2.5 border-4 border-solid w-11/12 h-heightdiv mt-2">
          <img className={"inset-0 h-full"}></img>
        </div>
        <Navbar></Navbar>
      </div>
    );
  }
};
export default home;
