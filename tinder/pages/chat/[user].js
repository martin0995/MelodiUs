import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import { BiArrowBack } from "react-icons/bi";

const chatId = () => {
  const router = useRouter();
  const data = router.query;
  const { data: session, status } = useSession();
  const [match, setMatch] = useState({});

  const backPage = (event) => {
    event.preventDefault();

    router.push("/logged/chat");
  };

  useEffect(() => {
    axios.get(`/api/chat/${data.user}`).then((data) => setMatch(data.data[0]));
  }, [status]);

  if (status === "authenticated") {
    return (
      <div className="bg-black text-white h-screen">
        <div className="flex flex-row text-verdedos ">
          <div className="text-black">
            <button className="p-2 text-2xl ml-2 text-white" onClick={backPage}>
              <BiArrowBack />
            </button>
          </div>
          <div className="flex gap-x-3 text-white items-center mb-6   w-3/4">
            {match.user1 ? (
              <div className="p-2 h-8 flex mx-auto gap-1">
                {match.user1.email == session.user.email ? (
                  <div className="flex flex-col h-fit w-fit items-center ">
                    <img
                      className="h-12 rounded-full shadow-lg"
                      src={match.user2.images[0]}
                      alt="User Image"
                    />
                    <h6> {match.user2.name}</h6>
                  </div>
                ) : (
                  <div className="flex flex-col h-fit w-fit items-center ">
                    <img
                      className="h-12 rounded-full shadow-lg"
                      src={match.user1.images[0]}
                      alt="User Image"
                    />
                    <h6> {match.user1.name}</h6>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default chatId;
