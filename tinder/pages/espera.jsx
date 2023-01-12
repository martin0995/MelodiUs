import React from "react";
import Imagen from "./Index/Imagen";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const espera = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  console.log(session);
  
  const fetchData = async () => {
    const data = await axios.get(`/api/newUser/:${session.user.email}`);
    console.log(data);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();

    setIsLoading(false);
  }, []);

  return <div>{isLoading ? <Imagen /> : null}</div>;
};

export default espera;
