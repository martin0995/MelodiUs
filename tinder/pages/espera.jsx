import React from "react";
import Imagen from "./Index/Imagen";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducers/userSlice";

const espera = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchData = async () => {
    if (status === "authenticated") {
      setIsLoading(true);
      try {
        console.log("entro1");
        const user = await axios.post("/api/newUser", {
          email: session.user.email,
        });
        if (user.status === 201) {
          dispatch(login(user.data));
          router.push("/logged/home");
        }
        if (user.status === 200) {
          router.push("/register/register");
        }
      } catch (error) {
        // if (error.response.status == 201) {
        //   console.log("errrorrr", error);
        //   dispatch(login(user.data));
        //   console.log(error);
        //   router.push("/logged/home");
        // }
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();

    setIsLoading(false);
  }, [status]);

  return <div>{isLoading ? <Imagen /> : null}</div>;
};

export default espera;
