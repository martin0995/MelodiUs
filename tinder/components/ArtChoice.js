import React from "react";

const ArtChoice = () => {
  return (
    <div class="flex">
      <div class="flex items-center mr-4">
        <input
          id="inline-checkbox"
          type="checkbox"
          value=""
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="inline-checkbox"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          0
        </label>
      </div>
      <div class="flex items-center mr-4">
        <input
          id="inline-checkbox"
          type="checkbox"
          value=""
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="inline-checkbox"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          1
        </label>
      </div>
      <div class="flex items-center mr-4">
        <input
          id="inline-checkbox"
          type="checkbox"
          value=""
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="inline-checkbox"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          2
        </label>
      </div>
      <div class="flex items-center mr-4">
        <input
          id="inline-checkbox"
          type="checkbox"
          value=""
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="inline-checkbox"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          3
        </label>
      </div>
    </div>
  );
};

export default ArtChoice;
