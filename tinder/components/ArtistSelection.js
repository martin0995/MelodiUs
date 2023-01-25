import React from "react";
import { useSelector } from "react-redux";
import { BsSpotify } from "react-icons/bs";
import Link from "next/link";

const ArtistSelection = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="w-full max-w-md p-4 bg-black border border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 text-white">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none dark:text-white">
          Artistas
        </h5>
        <Link
          href="/register/register3"
          className="text-md font-medium text-green-500 hover:underline dark:text-green-500"
        >
          Editar
        </Link>
      </div>
      <div className="flow-root">
        <ul role="list">
          {user.artists.map((artist) => {
            return (
              <li className="py-1 sm:py-4">
                <div className="flex items-center bg-gray-800 rounded-md h-10">
                  <div class="flex-shrink-0 ml-2 text-green-500">
                    <BsSpotify className="icon" size="25px" />
                  </div>
                  <div className="flex flex-1 min-w-0 justify-center">
                    <p className="text-lg font-medium text-white truncate dark:text-white pr-10">
                      {artist}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ArtistSelection;
