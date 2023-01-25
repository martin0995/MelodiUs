import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import MultiRangeSlider from "./MultiRangeSlider";
import axios from "axios";
import { useSession } from "next-auth/react";

const Preferences = () => {
  const user = useSelector((state) => state.user);
  const { data: session, status } = useSession();

  const [minVal, setMinVal] = useState(18);
  const [maxVal, setMaxVal] = useState(40);
  const updatePreferences = () => {
    let ageRange = [minVal, maxVal];
    axios.put("/api/settings", {
      ageRange: ageRange,
      email: session.user.email,
    });
  };

  return (
    <div className="w-full max-w-md p-4 bg-black border border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 text-white">
      <div className="text-center">
        {" "}
        <button
          onClick={updatePreferences}
          className="bg-verdecito text-white text-base border-b-4 border-verdedos w-2/6 rounded-full p-3"
        >
          Actualizar
        </button>
      </div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none dark:text-white">
          Ubicación
        </h5>
      </div>
      <div className="flow-root">
        <ul role="list">
          <li className="py-1 sm:py-4">
            <div className="flex items-center bg-gray-800 rounded-md h-10">
              <div class="flex-shrink-0 ml-2 text-green-500"></div>
              <div className="flex flex-1 min-w-0 justify-center">
                <p className="text-lg font-medium text-white truncate dark:text-white pr-10">
                  Neuquen
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between mt-4">
        <h5 className="text-xl font-bold leading-none dark:text-white">
          Preferencia de distancia
        </h5>
      </div>
      <div className="flow-root mt-4">
        <ul role="list">
          <li className="py-1 sm:py-4">
            <div className="">
              <div className="flex flex-1 min-w-0 justify-center">
                <MultiRangeSlider
                  min={18}
                  max={100}
                  onChange={({ min, max }) => {}}
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between mt-4">
        <h5 className="text-xl font-bold leading-none dark:text-white">
          Preferencia de edad
        </h5>
      </div>
      <div className="flex items-center flow-root mt-4 bg-gray-800 ">
        <ul role="list">
          <li className="py-1 sm:py-4">
            <div className="flex flex-1 min-w-0 justify-center mt-4">
              <MultiRangeSlider
                min={18}
                max={100}
                onChange={({ min, max }) => {
                  setMinVal(min);
                  setMaxVal(max);
                }}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Preferences;
