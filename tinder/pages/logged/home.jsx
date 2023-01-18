import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Icon from "../Index/Icon";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Image from "next/image";

const home = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState({});
  const [photo, setPhoto] = useState(0);
  const [person, setPerson] = useState(0);

  const getImage = async () => {
    const response = await axios.get("/api/newUser");
    setUsers(response);
  };

  useEffect(() => {
    getImage();
  }, []);

  const handlePhoto = () => {
    if (photo === 0) setPhoto(1);
    if (photo === 1) setPhoto(0);
  };

  const hanldeLike = (boolean) => {
    if (person < users.data.length - 1) {

      

      setPerson(person + 1);
      setPhoto(0);
    } else {
      alert("Lo sentimos, no hay personas en tu area.");
    }
  };

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
          {users.data ? (
            <Image
              src={users.data[person].images[photo]}
              alt="Users pictures"
              width={500}
              height={700}
              className="aspect-square"
              objectFit="cover"
            />
          ) : (
            ""
          )}
          <div className="flex flew-row justify-around">
            <button
              className="border-2 rounded-full w-1/5"
              onClick={handlePhoto}
            >
              Foto
            </button>
            <button
              className="border-2 rounded-full w-1/5"
              onClick={() => hanldeLike(false)}
            >
              X
            </button>
            <button
              className="border-2 rounded-full w-1/5"
              onClick={() => hanldeLike(true)}
            >
              CORAZON
            </button>
          </div>
        </div>
        <Navbar></Navbar>
      </div>
    );
  }
};
export default home;
