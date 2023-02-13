import React from "react";
import { useSelector } from "react-redux";
import { MdMovie } from "react-icons/md";
import Link from "next/link";

const MoviesSelection = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="w-full max-w-md p-4 bg-black border border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 text-white">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-bold leading-none dark:text-white uppercase">
          Películas
        </h5>
        <Link
          href={{ pathname: "/register/register4", query: { settings: true } }}
          className="text-md font-medium text-green-500 hover:underline dark:text-green-500"
        >
          Editar
        </Link>
      </div>
      <div className="flow-root">
        <ul role="list">
          {user.movies.map((movie) => {
            return (
              <li className="py-1 sm:py-4">
                <div className="flex items-center bg-gray-800 rounded-md h-10">
                  <div class="flex-shrink-0 ml-2 text-green-500">
                    <MdMovie className="icon" size="25px" />
                  </div>
                  <div className="flex flex-1 min-w-0 justify-center">
                    <p className="text-lg font-medium text-white truncate dark:text-white pr-10">
                      {movie.length > 20 ? movie.slice(0, 20) + "..." : movie}
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

export default MoviesSelection;
