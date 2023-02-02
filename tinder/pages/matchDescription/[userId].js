import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./userId.module.css";
import { FcApproval } from "react-icons/fc";
import ageCalculator from "../../reactHooks/ageCalculator";
import { ImLocation } from "react-icons/im";
import { BsSpotify } from "react-icons/bs";
import { MdMovie } from "react-icons/md";

const matchDescription = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const id = router.query;
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState(0);

  console.log("USER>>", user);

  const handlePhoto = () => {
    if (photo === 0) setPhoto(1);
    else {
      setPhoto(0);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .post("/api/userDescription", { id })
        .then((data) => setUser(data.data));
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <div className="h-full flex flex-col w-full items-center pt-2 bg-black">
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col w-full items-center mt-5 h-52">
            {user.images && (
              <Image
                src={user.images[photo]}
                alt="Users pictures"
                width={200}
                height={200}
                className={`object-center absolute${styles.perspectiveBack}`}
                onClick={handlePhoto}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-left w-full gap-4">
          <div className="flex flex-row items-center ml-4">
            <p className="text-2xl mt-2 mr-2 text-white">
              {user.name}, {ageCalculator(user.birthday)}
            </p>
            <FcApproval className="text-2xl" />
          </div>
          <div className="flex flex-row items-center ml-4 mr-2 border-b">
            <ImLocation color="white" className="text-2xl mr-2" />
            <p className="text-lg mt-2 mr-2 text-white  mb-2">{user.city}</p>
          </div>
          <div className="flex flex-col text-left ml-4 border-b mr-2">
            <p className="text-xl mt-2 mr-2 text-verdedos">
              <strong>Sobre mí</strong>
            </p>
            <p className="text-xl mt-2 mr-2 text-white mb-2">
              {user.description}
            </p>
          </div>
          <div className="flex flex-col text-left ml-4 border-b mr-2">
            <p className="text-xl mt-2 mr-2 text-verdedos">
              <strong>Música</strong>
            </p>
            <div className="flow-root">
              <ul role="list">
                {user.postedBy &&
                  user.postedBy.artist.map((artist) => {
                    return (
                      <li className="py-1 sm:py-4">
                        <div className="flex items-center bg-gray-800 rounded-md h-10">
                          <div class="flex-shrink-0 ml-2 text-green-500">
                            <BsSpotify className="icon" size="25px" />
                          </div>
                          <div className="flex flex-1 min-w-0 justify-center">
                            <p className="text-lg font-medium text-white truncate dark:text-white pr-10">
                              {artist}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="flex flex-col text-left ml-4 border-b mr-2">
            <p className="text-xl mt-2 mr-2 text-verdedos">
              <strong>Películas</strong>
            </p>
            <div className="flow-root">
              <ul role="list">
                {user.postedBy &&
                  user.postedBy.movies.map((movie) => {
                    return (
                      <li className="py-1 sm:py-4">
                        <div className="flex items-center bg-gray-800 rounded-md h-10">
                          <div class="flex-shrink-0 ml-2 text-green-500">
                            <MdMovie className="icon" size="25px" />
                          </div>
                          <div className="flex flex-1 min-w-0 justify-center">
                            <p className="text-lg font-medium text-white truncate dark:text-white pr-10">
                              {movie.length > 20
                                ? movie.slice(0, 20) + "..."
                                : movie}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default matchDescription;
