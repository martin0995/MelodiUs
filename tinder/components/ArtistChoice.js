import React, { useState } from "react";

const ArtistChoice = () => {
  const [value, setValue] = useState(1);

  const hanldeSelection = (selection) => {
    setValue(selection);

    
  };

  return (
    <div class="flex">
      <div class="flex items-center mr-4">
        {value == 0 ? (
          <input
            checked
            id="inline-radio"
            type="radio"
            value=""
            name="inline-radio-group"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onClick={() => {
              hanldeSelection(0);
            }}
          />
        ) : (
          <input
            id="inline-radio"
            type="radio"
            value=""
            name="inline-radio-group"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onClick={() => {
              hanldeSelection(0);
            }}
          />
        )}
        <label
          for="inline-radio"
          class="ml-2 text-md font-medium text-white dark:text-gray-300"
        >
          0
        </label>
      </div>
      <div class="flex items-center mr-4">
        {value == 1 ? (
          <input
            checked
            id="inline-2-radio"
            type="radio"
            value=""
            name="inline-radio-group"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onClick={() => {
              hanldeSelection(1);
            }}
          />
        ) : (
          <input
            id="inline-2-radio"
            type="radio"
            value=""
            name="inline-radio-group"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onClick={() => {
              hanldeSelection(1);
            }}
          />
        )}
        <label
          for="inline-2-radio"
          class="ml-2 text-md font-medium text-white dark:text-gray-300"
        >
          1
        </label>
      </div>
      <div class="flex items-center mr-4">
        {value == 2 ? (
          <input
            checked
            id="inline-checked-radio"
            type="radio"
            value=""
            name="inline-radio-group"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onClick={() => {
              hanldeSelection(2);
            }}
          />
        ) : (
          <input
            id="inline-checked-radio"
            type="radio"
            value=""
            name="inline-radio-group"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onClick={() => {
              hanldeSelection(2);
            }}
          />
        )}
        <label
          for="inline-checked-radio"
          class="ml-2 text-md font-medium text-white dark:text-gray-300"
        >
          2
        </label>
      </div>
      <div class="flex items-center">
        <input
          disabled
          id="inline-disabled-radio"
          type="radio"
          value=""
          name="inline-radio-group"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="inline-disabled-radio"
          class="ml-2 text-md font-medium text-white dark:text-gray-500"
        >
          +3
        </label>
      </div>
    </div>
  );
};

export default ArtistChoice;
