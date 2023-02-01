import React from "react";
import Link from "next/link";

const Chatcard = ({ match }) => {
  return (
    <Link href={`/chat/${match.id}`}>
      <div className="flex flex-row items-center">
        <div className="flex justify-center w-16 items-center border border-gray-200 mr-4 rounded-lg">
          <div className="flex flex-col h-fit w-fit items-center ">
            <img
              className="h-16 rounded-lg shadow-lg"
              src={match.user.images[0]}
              alt="User Image"
            />
          </div>
        </div>
        <div className="flex flex-col text-white">
          <h5 className="text-lg text-white font-medium dark:text-white">
            {match.user.name}
          </h5>
          <p>{match.chat[match.chat.length - 1].message}</p>
        </div>
      </div>
      <div className="mt-2 border-t border-solid w-full "></div>
    </Link>
  );
};

export default Chatcard;
