import React, { useState, useEffect, useRef } from "react";
import Icon from "../../Index/Icon";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Cruz from "../../register/Cruz";
import { IoAddCircleOutline } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";

const userProfile = () => {
  const user = useSelector((state) => state.user);
  const { data: session, status } = useSession();
  const [image, setimage] = useState(""); // JPG file uploaded
  const [image2, setimage2] = useState(""); // JPG file uploaded
  const [imagenes, setImagenes] = useState(null); // img URL
  const [imagenes2, setImagenes2] = useState(null);
  const ref1 = useRef();
  const ref2 = useRef();

  useEffect(() => {
    setImagenes(user.images[0]);
    setImagenes2(user.images[1]);
  }, [user.images[0]]);

  const deleteimage = (event, img) => {
    event.preventDefault();
    if (img === 1) {
      setImagenes(null), (ref1.current.value = "");
    }
    if (img === 2) {
      setImagenes2(null), (ref2.current.value = "");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imagenes || !imagenes2) {
      return alert("Por favor, agregar dos fotos");
    }

    await axios.put("/api/newUser2", {
      imagenes: [imagenes, imagenes2],
      email: session.user.email,
    });
  };

  if (status === "authenticated") {
    return (
      <div className="bg-white text-black h-screen">
        <div className="flex text-verdedos  items-center ">
          <div className="p-2 h-8 flex mx-auto gap-1 ">
            <Icon />
            <h6> tinderMusic</h6>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col text-xl gap-6">
          <div className="flex flex-col m-6 gap-6 ">
            <div id="divfile">
              <button
                onClick={(e) => deleteimage(e, 1)}
                className={imagenes ? "absolute z-10" : "hidden"}
              >
                <Cruz />
              </button>
              <IoAddCircleOutline
                className={imagenes ? "hidden" : "text-4xl mt-24 m-auto"}
              />
              <input
                type="file"
                className="absolute inset-0 opacity-0 h-full w-full "
                onChange={(e) => {
                  setimage(e.target.files[0]);
                }}
                ref={ref1}
              ></input>

              <img
                className={imagenes ? "inset-0 h-full" : "hidden"}
                src={imagenes}
              ></img>
            </div>

            <div id="divfile">
              <button
                onClick={(e) => deleteimage(e, 2)}
                className={imagenes2 ? "absolute z-10" : "hidden"}
              >
                <Cruz />
              </button>
              <IoAddCircleOutline
                className={imagenes2 ? "hidden" : "text-4xl mt-24 m-auto 	"}
              />
              <input
                type="file"
                className="absolute inset-0 opacity-0 h-full w-full "
                onChange={(e) => {
                  setimage2(e.target.files[0]);
                }}
                ref={ref2}
              ></input>

              <img
                className={imagenes2 ? "inset-0 h-full" : "hidden"}
                src={imagenes2}
              ></img>
            </div>
          </div>
        </form>

        <Navbar></Navbar>
      </div>
    );
  }
};

export default userProfile;
