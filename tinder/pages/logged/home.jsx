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
  const { location, place } = useGeolocation();
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  // const [height, setHeight] = useState("full");

  console.log("USER", users);

  const getImage = async () => {
    const response = await axios.get(`/api/userId/${session.user.email}`);
    setUsers(response);
  };

  const editPreferences = () => {
    router.push("/logged/userProfile/settings");
  };

  const update = () => {
    setSpinner(true);

    setTimeout(() => {
      getImage();
      setSpinner(false);
    }, 3000);
  };

  useEffect(() => {
    // users.data ? setHeight("full") : setHeight("screen");
  }, [users]);

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
  }, [noPerson, userRedux.id]);

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
      <div
        className={`h-screen flex flex-col w-full items-center justify-between pt-6 bg-black`}
      >
        <div className="flex gap-x-3 text-verdedos items-center mb-6">
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
                              {users.data[person].birthday}
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
                {spinner ? (
                  <div role="status" className="p-2">
                    <svg
                      aria-hidden="true"
                      class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-verdedos"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* {users.data
          ? users.data[person].similarartist && (
              <div className="flex flex-col w-screen h-full mt-4">
                <div>
                  <p className="text-base ml-4 text-white uppercase">
                    <strong>Match de artistas</strong>
                  </p>
                </div>
                <div className="flex flex-row gap-2 flex-wrap mt-2 mb-2 ml-4">
                  {users.data[person].similarartist.map((artist) => {
                    return (
                      <div className="flex flex-row text-sm border-2 border-verdecito border-solid rounded-md items-center p-1">
                        <p className="text-white">{artist}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          : ""}

        {users.data
          ? users.data[person].similarmovies && (
              <div className="flex flex-col w-screen h-full mt-2 mb-16">
                <div>
                  <p className="text-base ml-4 text-white uppercase">
                    <strong>Match de películas</strong>
                  </p>
                </div>
                <div className="flex flex-row gap-2 flex-wrap mt-2 ml-4">
                  {users.data[person].similarmovies.map((movie) => {
                    return (
                      <div className="flex flex-row text-sm border-2 border-verdecito border-solid rounded-md items-center p-1">
                        <p className="text-white">{movie}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          : ""} */}

        <Navbar></Navbar>
      </div>
    );
  }
};
export default home;
