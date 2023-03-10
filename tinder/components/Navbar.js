import React, { useState } from "react";
import Icon from "../pages/Index/Icon";
import { BsFillChatFill } from "react-icons/bs";
import { HiOutlineMusicNote } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ageCalculator from "../reactHooks/ageCalculator";
import { login } from "../store/reducers/userSlice";
import axios from "axios";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSection = (path) => {
    router.push(`${path}`);
  };

  useEffect(() => {
    if (status === "authenticated") {
      const searchUser = async () => {
        const usuario = await axios.post("/api/newUser2", {
          email: session.user.email,
        });

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
      };

      searchUser();
    }
  }, [session.user.email]);

  if (status === "authenticated") {
    return (
      <div className="w-full py-3 flex flex-row justify-around mt-2 text-verdedos fixed bottom-0 z-30 bg-black">
        <div>
          <HiOutlineMusicNote
            className="text-3xl"
            onClick={() => handleSection("/logged/home")}
          />
        </div>
        <div>
          <BsFillChatFill
            className="text-3xl"
            onClick={() => handleSection("/logged/matchView")}
          />
        </div>
        <div>
          {" "}
          <CgProfile
            className="text-3xl"
            onClick={() => handleSection("/logged/userProfile/profile")}
          />
        </div>
      </div>
    );
  }
};

export default Navbar;
