import React from "react";
import { ImFire } from "react-icons/im";

const NoUsers = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 mb-8">
      <div className="w-full flex justify-center">
        <ImFire className="text-7xl text-red-700 mb-3" />
      </div>
      <div className="p-1 flex justify-center">
        <p className="text-center text-xl">
          Lo sentimos, no hay mas usuarios en la zona seleccionada
        </p>
      </div>
    </div>
  );
};

export default NoUsers;
