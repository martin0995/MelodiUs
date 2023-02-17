import React, { useState, useEffect, useRef } from "react";
import Icon from "../../Index/Icon";
import Navbar from "../../../components/Navbar";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Cruz from "../../register/Cruz";
import { IoAddCircleOutline } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import ArtistSelection from "../../../components/ArtistSelection";
import MoviesSelection from "../../../components/MoviesSelection";
import { toast } from "react-toastify";

const userProfile = () => {
  const user = useSelector((state) => state.user);
  const { data: session, status } = useSession();
  const [image, setimage] = useState(""); // JPG file uploaded
  const [image2, setimage2] = useState(""); // JPG file uploaded
  const [imagenes, setImagenes] = useState(null); // img URL
  const [imagenes2, setImagenes2] = useState(null);
  const ref3 = useRef();
  const ref4 = useRef();

  useEffect(() => {
    setImagenes(user.images[0]);
    setImagenes2(user.images[1]);
  }, [user.images[0]]);

  useEffect(() => {
    if (image) submitImage(1);
  }, [image]);

  useEffect(() => {
    if (image2) submitImage(2);
  }, [image2]);

  const deleteimage = (event, img) => {
    event.preventDefault();
    if (img === 1) {
      setImagenes(null), (ref3.current.value = "");
    }
    if (img === 2) {
      setImagenes2(null), (ref4.current.value = "");
    }
  };
  const submitImage = (img) => {
    const data = new FormData();
    if (img === 1) {
      data.append("file", image);
    } else {
      data.append("file", image2);
    }
    data.append("upload_preset", "xwz9qlxn");
    data.append("cloud_name", "dnieujc6g");
    fetch("https://api.cloudinary.com/v1_1/dnieujc6g/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (img === 1) {
          setImagenes(data.url);
        } else {
          setImagenes2(data.url);
        }
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imagenes || !imagenes2) {
      return toast.warn("Por favor, agregar dos fotos", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    await axios.put("/api/newUser2", {
      imagenes: [imagenes, imagenes2],
      email: session.user.email,
    });
  };

  if (status === "authenticated") {
    return (
      <div className="flex flex-col justify-between bg-black text-white h-screen">
        <div className="flex text-verdespotify  items-center ">
          <div className="p-2 h-8 flex mx-auto gap-1 text-green-500">
            <Icon />
            <h6> MelodiUs</h6>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-xl gap-6 w-full max-w-md"
        >
          <div className="flex flex-col mt-6 mb-6 gap-6 p-4">
            <h5 className="text-lg font-bold leading-none dark:text-whitetext-xl font-bold leading-none dark:text-white uppercase">
              Editar fotos
            </h5>
            <div id="divfile">
              <button
                onClick={(e) => deleteimage(e, 1)}
                className={imagenes ? "absolute z-10" : "hidden"}
              >
                <div className="rounded bg-red-400">
                  <Cruz />
                </div>
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
                ref={ref3}
              ></input>

              <img
                className={imagenes ? "inset-0 h-full w-full" : "hidden"}
                src={imagenes}
              ></img>
            </div>

            <div id="divfile">
              <button
                onClick={(e) => deleteimage(e, 2)}
                className={imagenes2 ? "absolute z-10" : "hidden"}
              >
                <div className="rounded bg-red-400">
                  <Cruz />
                </div>
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
                ref={ref4}
              ></input>

              <img
                className={imagenes2 ? "inset-0 h-full w-full" : "hidden"}
                src={imagenes2}
              ></img>
            </div>
          </div>
        </form>

        <div>
          <ArtistSelection />
        </div>
        <div className="pb-8">
          <MoviesSelection />
        </div>

        <Navbar className="fixed"></Navbar>
      </div>
    );
  }
};

export default userProfile;
