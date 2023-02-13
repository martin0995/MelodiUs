import React from "react";
import { ImFire } from "react-icons/im";

const NoUsers = () => {
  return (
    <div className="flex flex-col h-[50%] items-center justify-center gap-1 mb-6 ">
      <div className="w-full flex justify-center">
        <ImFire className="text-7xl text-red-700 mb-3" />
      </div>
      <div className="p-1 flex justify-center w-3/4">
        <p className="text-center text-xl">
          Lo sentimos, no hay más usuarios en la zona seleccionada
        </p>
      </div>
    </div>
  );
};

export default NoUsers;
