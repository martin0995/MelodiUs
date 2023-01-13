import React from "react";
import Imagen from "./Index/Imagen";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const espera = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetchData = async () => {
    if (status === "authenticated") {
      setIsLoading(true);
      try {
        const user = await axios.post("/api/newUser", {
          email: session.user.email,
        });

        router.push("/register/register");
      } catch (error) {
        if (error.response.status == 404) {
          console.log(error);
          router.push("/logged/home");
        }
      }
    }
  };

  useEffect(() => {
    fetchData();

    setIsLoading(false);
  }, [session]);

  return <div>{isLoading ? <Imagen /> : null}</div>;
};

export default espera;
