import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Icon from "../Index/Icon";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Image from "next/image";

const home = () => {
  const { data: session, status } = useSession();

  const [users, setUsers] = useState({});

  const getImage = async () => {
    const response = await axios.get("/api/newUser");
    setUsers(response);
  };
  useEffect(() => {
    getImage();
  }, []);
  if (users) {
    if (users.data) {
      console.log(users.data[0]);
    }
  }

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
        <div className="m-auto relative  border-4 border-solid w-11/12 h-heightdiv mt-2">
          {/* {users.data
            ? users.data[0].images.map((image) => {
                return (
                  <Image
                    src={image}
                    alt="Users pictures"
                    width={500}
                    height={700}
                    // className="inset-0 h-full"
                    objectFit="cover"
                  />
                );
              })
            : "null"} */}

          <Image
            src={users.data[0].images[0]}
            alt="Users pictures"
            width={500}
            height={700}
            // className="inset-0 h-full"
            objectFit="cover"
          />
        </div>
        <Navbar></Navbar>
      </div>
    );
  }
};
export default home;
