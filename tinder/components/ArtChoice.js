import React from "react";

const ArtChoice = () => {
  return (
    <div class="flex">
      <div class="flex items-center mr-4">
        <input
          id="inline-radio"
          type="radio"
          value=""
          name="inline-radio-group"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="inline-radio"
          class="ml-2 text-md font-medium text-white dark:text-gray-300"
        >
          0
        </label>
      </div>
      <div class="flex items-center mr-4">
        <input
          id="inline-2-radio"
          type="radio"
          value=""
          name="inline-radio-group"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="inline-2-radio"
          class="ml-2 text-md font-medium text-white dark:text-gray-300"
        >
          1
        </label>
      </div>
      <div class="flex items-center mr-4">
        <input
          id="inline-checked-radio"
          type="radio"
          value=""
          name="inline-radio-group"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
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
          3
        </label>
      </div>
    </div>
  );
};

export default ArtChoice;
