import React from "react";
import Link from "next/link";

const MatchCard = ({ match }) => {
  return (
    <Link href={`/chat/${match.id}`}>
      <div className="flex flex-col items-center ml-2">
        <div className="flex justify-center  items-center">
          <div className="flex flex-col h-full w-full items-center ">
            <img
              className="h-20 w-20 rounded-full shadow-lg"
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
