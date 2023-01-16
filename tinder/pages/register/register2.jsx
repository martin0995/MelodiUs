import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cruz from "./cruz.js";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios";
import { useSession } from "next-auth/react";

const register2 = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [image, setimage] = useState(""); // JPG file uploaded
  const [image2, setimage2] = useState(""); // JPG file uploaded
  const [imagenes, setImagenes] = useState(null); // img URL
  const [imagenes2, setImagenes2] = useState(null); // img URL

  const Nextpage = (event) => {
    event.preventDefault();

    router.push("/register/register");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put("/api/newUser2", {
      imagenes: imagenes,
      email: session.user.email,
    });
  };
  const deleteimage = (event, img) => {
    event.preventDefault();
    if (img === 1) setImagenes(null);
    if (img === 2) setImagenes2(null);
  };

  const submitImage = (img) => {
    console.log(img);

    console.log("entro");
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
  // const submitImage2 = (img) => {
  //   console.log("entro");
  //   const data = new FormData();
  //   data.append("file", image2);
  //   data.append("upload_preset", "xwz9qlxn");
  //   data.append("cloud_name", "dnieujc6g");
  //   fetch("https://api.cloudinary.com/v1_1/dnieujc6g/image/upload", {
  //     method: "post",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setImagenes2(data.url));
  // };

  useEffect(() => {
    if (image) submitImage(1);
  }, [image]);

  useEffect(() => {
    if (image2) submitImage(2);
  }, [image2]);

  return (
    <div className="bg-white text-black h-screen">
      <div className="flex flex-row text-verdedos">
        <div className="text-black">
          <button className="p-2" onClick={Nextpage}>
            Volver atras
          </button>
        </div>
        <div className="p-2 h-8 flex mx-auto gap-1">
          <h6> tinderMusic</h6>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col text-xl gap-6">
        <div className="flex flex-col text-1xl m-6 gap-6 ">
          <p>Cargar fotos</p>
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
            ></input>

            <img
              className={imagenes2 ? "inset-0 h-full" : "hidden"}
              src={imagenes2}
            ></img>
          </div>
        </div>
        <div className="flex flex-col text-2xl m-6 ">
          <button
            className="bg-verdecito border-b-8 border-verdedos text-white hover:bg-verdedos  w-48 rounded-full p-3 m-auto mt-12"
            type="submit"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};

export default register2;
