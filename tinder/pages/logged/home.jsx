import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Icon from "../Index/Icon";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import styles from "./home.module.css";
import NoUsers from "../../components/noUsers";
import { useSelector } from "react-redux";
import useGeolocation from "../../reactHooks/useGeolocation";
import ageCalculator from "../../reactHooks/ageCalculator";
import useDistance from "../../reactHooks/useDistance";
import { ImLocation } from "react-icons/im";
import { AiFillInfoCircle } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";

const home = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState({});
  const [photo, setPhoto] = useState(0);
  const [person, setPerson] = useState(0);
  const [userId, setuserId] = useState(null);
  const [noPerson, setNoPerson] = useState(false);
  const userRedux = useSelector((state) => state.user);
  const [updatePage, setUpdatePage] = useState(false);
  const { location, place } = useGeolocation();
  const router = useRouter();

  const getImage = async () => {
    const response = await axios.get(`/api/userId/${session.user.email}`);
    setUsers(response);
  };

  const editPreferences = () => {
    router.push("/logged/userProfile/settings");
  };

  const update = () => {
    setUpdatePage(!updatePage);
  };

  useEffect(() => {
    if (status === "authenticated" && place) {
      axios.put("/api/newUser", {
        email: session.user.email,
        location: {
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng,
        },
        city: place,
      });
    }
  }, [place]);

  useEffect(() => {
    if (status === "authenticated") {
      getImage();
      setuserId(userRedux);
    }
  }, [noPerson, userRedux.id, updatePage]);

  const handlePhoto = () => {
    if (photo === 0) setPhoto(1);
    else {
      setPhoto(0);
    }
  };

  const hanldeLike = async (boolean) => {
    try {
      if (person < users.data.length) {
        // Se genera el like y/o match:
        const connection = await axios.post("/api/connections", {
          connectionBy: userId.id,
          like: boolean,
          referencia: users.data[person]._id,
        });

        // Distinguir Array de Objeto. Alerta de MATCH:
        if (connection.data.user1) alert("Has conseguido un MATCH!");

        // No hay mas personas en el area:
        if (person + 1 >= users.data.length) {
          setNoPerson(!noPerson);

          return alert("Lo sentimos, no hay personas en tu area.");
        }
        setPerson(person + 1);
        setPhoto(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "authenticated") {
    return (
      <div className="h-screen flex flex-grow flex-shrink-0 flex-col w-full items-center justify-end pt-6 bg-black">
        <div className="flex gap-x-3 text-verdedos flex-grow flex-shrink-0 items-center mb-6">
          <div className="p-2 h-8 flex mx-auto gap-1">
            <Icon />
            <h6> tinderMusic</h6>
          </div>
          {/* <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button> */}
        </div>
        <div className="block h-full w-full flex items-center justify-center">
          <div
            className={`m-auto relative  overflow-hidden border border-solid rounded-lg w-11/12 mt-2 ${styles.photoContainer}`}
          >
            {users.data ? (
              <>
                <div className="relative w-[120%] h-full -left-[10%]  bg-gray-900">
                  {users.data.length > 0 ? (
                    <div>
                      <Image
                        src={users.data[person].images[photo]}
                        alt="Users pictures"
                        fill
                        className={`object-cover object-center absolute z-5 ${styles.perspectiveBack}`}
                        onClick={handlePhoto}
                      />
                      <div className="w-full absolute bottom-16 z-10 gap-2 flex flex-col justify-left text-white ml-10  w-4/5">
                        <div className="flex flex-row justify-between">
                          <p className="text-white text-2xl">
                            <strong>
                              {users.data[person].name},
                              {ageCalculator(users.data[person].birthday)}
                            </strong>
                          </p>
                          <Link
                            href={`/matchDescription/${users.data[person]._id}-home-1`}
                          >
                            <AiFillInfoCircle className="text-2xl mr-1 text-center" />
                          </Link>
                        </div>
                        <div className="flex flex-row">
                          <ImLocation color="white" className="text-xl mr-1" />
                          <p className="text-white text-xl">
                            A{" "}
                            {Math.round(
                              useDistance(
                                userRedux.location.latitude,
                                userRedux.location.longitude,
                                users.data[person].location.latitude,
                                users.data[person].location.longitude,
                                "K"
                              )
                            )}{" "}
                            kilómetros de distancia
                          </p>
                        </div>
                      </div>

                      <div className="w-full absolute bottom-2 z-10 flex flew-row justify-around text-white ml-10    w-4/5 ">
                        <button
                          className="border border-red-600 rounded-full w-1/5 p-3 flex items-center justify-center "
                          onClick={() => hanldeLike(false)}
                        >
                          <ImCross className="text-red-600" />
                        </button>

                        <button
                          className="border border-verdedos rounded-full w-1/5 p-3 flex items-center justify-center"
                          onClick={() => hanldeLike(true)}
                        >
                          <AiFillHeart className="text-verdedos text-2xl" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              <div className="bg-gray-800 h-full w-full flex justify-center items-center flex-col gap-2 text-white">
                <NoUsers />
                <button
                  className="bg-verdecito border-b-2 border-verdedos hover:bg-verdedos rounded-full p-2 text-md"
                  onClick={update}
                >
                  Actualizar
                </button>
                <p className="text-xl">ó</p>
                <button
                  className="bg-verdedos border-b-2 border-verdecito hover:bg-verdedos rounded-full p-2 text-md"
                  onClick={editPreferences}
                >
                  Editar preferencias de búsqueda
                </button>
              </div>
            )}
          </div>
        </div>
        <Navbar></Navbar>
      </div>
    );
  }
};
export default home;
