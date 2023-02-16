import React from "react";
import Link from "next/link";

const MatchCard = ({ match }) => {
  return (
    <Link href={`/chat/${match.id}`}>
      <div className="flex flex-col items-center">
        <div className="flex justify-center w-28 items-center border-gray-200 rounded-full">
          <div className="flex flex-col h-fit w-fit items-center ">
            <img
              className="h-28 rounded-full shadow-lg"
              src={match.user.images[0]}
              alt="User Image"
            />
          </div>
        </div>
        <div>
          <h5 className="text-lg text-white font-medium dark:text-white">
            {match.user.name}
          </h5>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
