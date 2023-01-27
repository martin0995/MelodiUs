import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { login, update } from "../store/reducers/userSlice";
import axios from "axios";
import ageCalculator from "../reactHooks/ageCalculator";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

export default function test({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  console.log("raro", session);
  useEffect(() => {
    if (status === "authenticated") {
      const searchUser = async () => {
        const usuario = await axios.post("/api/newUser2", {
          email: session.user.email,
        });
        console.log(usuario);

        const userRedux = {
          id: usuario.data._id,
          name: usuario.data.name,
          email: usuario.data.email,
          birthday: ageCalculator(usuario.data.birthday),
          genre: usuario.data.genre,
          searchGenre: usuario.data.searchGenre,
          isAdmin: false,
          images: usuario.data.images,
          movies: usuario.data.postedBy.movies,
          artists: usuario.data.postedBy.artist,
          description: usuario.data.description,
          ageRange: usuario.data.ageRange,
          location: usuario.data.location,
          city: usuario.data.city,
          distance: usuario.data.distance,
          artistSelection: usuario.data.artistPreference,
          movieSelection: usuario.data.moviePreference,
        };

        dispatch(login(userRedux));
        // dispatch(update({ key: "artistSelection", payload: "1" }));
      };
      searchUser();
    }
  }, []);
  if (status === "authenticated") {
    console.log("children", children);
    return (
      <div>
        {children}
        <Navbar></Navbar>
      </div>
    );
  }
}
