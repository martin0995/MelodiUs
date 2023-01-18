import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Icon from "../Index/Icon";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { ImCross } from "react-icons/im";

const home = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState({});
  const [photo, setPhoto] = useState(0);
  const [person, setPerson] = useState(0);
  const [userId, setuserId] = useState("");

  const getImage = async () => {
    const response = await axios.get(`/api/userId/${session.user.email}`);
    setUsers(response);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getImage();

      axios
        .post("/api/newUser2", { email: session.user.email })
        .then((data) => setuserId(data.data._id));
    }
  }, [session]);

  const handlePhoto = () => {
    if (users.data[person].images[1]) {
      if (photo === 0) setPhoto(1);
      if (photo === 1) setPhoto(0);
    }
  };

  const hanldeLike = async (boolean) => {
    if (person < users.data.length) {
      const connection = await axios.post("/api/connections", {
        connectionBy: userId,
        like: boolean,
        referencia: users.data[person]._id,
      });

      if (person + 1 >= users.data.length) {
        return alert("Lo sentimos, no hay personas en tu area.");
      }
      setPerson(person + 1);
      setPhoto(0);
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
              <ImCross />
            </button>
            <button
              className="border-2 rounded-full w-1/5"
              onClick={() => hanldeLike(true)}
            >
              <AiFillHeart />
            </button>
          </div>
        </div>
        <Navbar></Navbar>
      </div>
    );
  }
};
export default home;
