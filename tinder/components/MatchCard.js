import React from "react";

const MatchCard = ({ match }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center border border-gray-200 rounded-full">
        <div className="flex flex-col h-fit w-fit items-center ">
          <img
            className="w-28 h-28 rounded-full shadow-lg"
            src={match.user.images[1]}
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
  );
};

export default MatchCard;
