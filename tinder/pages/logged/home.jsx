import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Icon from "../Index/Icon";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import styles from "./home.module.css";
import noUsers from "../../components/noUsers";

const home = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState({});
  const [photo, setPhoto] = useState(0);
  const [person, setPerson] = useState(0);
  const [userId, setuserId] = useState("");
  const [noPerson, setNoPerson] = useState(false);

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
  }, [session, noPerson]);

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

      console.log("CONNECTION", connection);

      if (person + 1 >= users.data.length) {
        setNoPerson(true);
        return alert("Lo sentimos, no hay personas en tu area.");
      }
      setPerson(person + 1);
      setPhoto(0);
    }
  };

  if (status === "authenticated") {
    return (
      <div className="text-black h-screen flex flex-grow flex-shrink-0 flex-col w-full items-center justify-end pt-6">
        <div className="flex gap-x-3 text-verdedos flex-grow flex-shrink-0 items-center mb-6">
          <div className="p-2 h-8 flex mx-auto gap-1">
            <Icon />
            <h6> tinderMusic</h6>
          </div>
          {/* <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button> */}
        </div>
        <div className="block h-full w-full flex items-center justify-center">
          <div
            className={`m-auto relative  overflow-hidden border-4 border-solid w-11/12 mt-2 ${styles.photoContainer}`}
          >
            {users.data ? (
              <>
                <div className="relative w-[120%] h-full -left-[10%]">
                  {users.data.length > 0 ? (
                    <div>
                      <Image
                        src={users.data[person].images[photo]}
                        alt="Users pictures"
                        fill
                        className={`object-cover object-center absolute -z-10 ${styles.perspectiveBack}`}
                      />
                      <div className="w-full absolute bottom-10 z-10 flex flew-row justify-around">
                        <button
                          className="border-2 rounded-full w-1/5 p-3 flex items-center justify-center"
                          onClick={handlePhoto}
                        >
                          Foto
                        </button>
                        <button
                          className="border-2 rounded-full w-1/5 p-3 flex items-center justify-center"
                          onClick={() => hanldeLike(false)}
                        >
                          <ImCross />
                        </button>
                        <button
                          className="border-2 rounded-full w-1/5 p-3 flex items-center justify-center"
                          onClick={() => hanldeLike(true)}
                        >
                          <AiFillHeart />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <noUsers />
                  )}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <Navbar></Navbar>
      </div>
    );
  }
};
export default home;
