import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

const UserSettings = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="w-full max-w-md p-4 bg-black border border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 text-white">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none dark:text-white">
          Nombre
        </h5>
        <Link
          href={{
            pathname: "/register/register",
            query: { settings: true }, // the data
          }}
          className="text-md font-medium text-green-500 hover:underline dark:text-green-500"
        >
          Editar
        </Link>
      </div>
      <div className="flow-root">
        <ul role="list">
          <li className="py-1 sm:py-4">
            <div className="flex items-center bg-gray-800 rounded-md h-10">
              <div class="flex-shrink-0 ml-2 text-green-500"></div>
              <div className="flex flex-1 min-w-0 justify-center">
                <p className="text-lg font-medium text-white truncate dark:text-white pr-10">
                  {user.name}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none dark:text-white">Edad</h5>
      </div>
      <div className="flow-root">
        <ul role="list">
          <li className="py-1 sm:py-4">
            <div className="flex items-center bg-gray-800 rounded-md h-10">
              <div class="flex-shrink-0 ml-2 text-green-500"></div>
              <div className="flex flex-1 min-w-0 justify-center">
                <p className="text-lg font-medium text-white truncate dark:text-white pr-10">
                  {user.birthday}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none dark:text-white">
          Correo
        </h5>
      </div>
      <div className="flow-root">
        <ul role="list">
          <li className="py-1 sm:py-4">
            <div className="flex items-center bg-gray-800 rounded-md h-10">
              <div class="flex-shrink-0 ml-2 text-green-500"></div>
              <div className="flex flex-1 min-w-0 justify-center">
                <p className="text-lg font-medium text-white truncate dark:text-white pr-10">
                  {user.email}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none dark:text-white">
          Género
        </h5>
      </div>
      <div className="flow-root">
        <ul role="list">
          <li className="py-1 sm:py-4">
            <div className="flex items-center bg-gray-800 rounded-md h-10">
              <div class="flex-shrink-0 ml-2 text-green-500"></div>
              <div className="flex flex-1 min-w-0 justify-center">
                <p className="text-lg font-medium text-white truncate dark:text-white pr-10">
                  {user.genre}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none dark:text-white">
          Mostrar
        </h5>
      </div>
      <div className="flow-root">
        <ul role="list">
          <li className="py-1 sm:py-4">
            <div className="flex items-center bg-gray-800 rounded-md h-10">
              <div class="flex-shrink-0 ml-2 text-green-500"></div>
              <div className="flex flex-1 min-w-0 justify-center">
                <p className="text-lg font-medium text-white truncate dark:text-white pr-10">
                  {user.searchGenre}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSettings;
