import React from "react";
// import { HiOutlineMusicNote } from "react-icons/hi";
// import { IoMusicalNotesSharp } from "react-icons/io";
import { ImMusic } from "react-icons/Im";
const Imagen = () => {
  return (
    <div
      className="bg-fondito bg-center bg-no-repeat h-screen flex flex-col justify-center  m-auto"
      id="icono"
    >
      {/* <img
        className="w-60 m-auto text-verdespotify"
        id="imagenicono"
        src="./Music.png"
        alt="HTML icon"
      /> */}
      <div
        id="imagenicono"
        className="flex justify-center w-full m-auto text-verdespotify items-center h-1/2"
      >
        <ImMusic className="text-grande" />
      </div>
    </div>
  );
};

export default Imagen;
