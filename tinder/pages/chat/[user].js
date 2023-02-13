import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import { BiArrowBack } from "react-icons/bi";
import Chat from "../chat";
import Link from "next/link";

const chatId = () => {
  const router = useRouter();
  const data = router.query;
  const { data: session, status } = useSession();
  const [match, setMatch] = useState({});

  const backPage = (event) => {
    event.preventDefault();

    router.push("/logged/matchView");
  };

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get(`/api/chat/${data.user}-${session.user.email}`)
        .then((data) => setMatch(data.data));
    }
    // .then((data) => console.log(data.data))
  }, [status]);

  if (status === "authenticated") {
    return (
      <div className="bg-black h-screen">
        <div className="flex flex-row text-verdedos h-[10%]">
          <div className="text-black flex flex-col justify-center">
            <div>
              <button
                className="p-2 text-2xl ml-2 text-white"
                onClick={backPage}
              >
                <BiArrowBack />
              </button>
            </div>
          </div>
          <div className="flex gap-x-3 text-white items-center    w-3/4">
            {match.user ? (
              <div className="flex p-2 h-8 flex mx-auto items-center">
                <div className="flex flex-col w-fit  h-fit items-center ">
                  <Link
                    href={`/matchDescription/${match.user._id}-${match.id}-2`}
                  >
                    <img
                      className="h-12 rounded-full shadow-lg"
                      src={match.user.images[0]}
                      alt="User Image"
                    />
                  </Link>
                  <h6> {match.user.name}</h6>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {match.user ? <Chat match={match} /> : ""}
      </div>
    );
  }
};

export default chatId;
