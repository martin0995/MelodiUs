import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import MultiRangeSlider from "./MultiRangeSlider";

const Preferences = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="w-full max-w-md p-4 bg-black border border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 text-white">
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
                  onChange={({ min, max }) =>
                    console.log(`min = ${min}, max = ${max}`)
                  }
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
                onChange={({ min, max }) =>
                  console.log(`min = ${min}, max = ${max}`)
                }
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Preferences;
