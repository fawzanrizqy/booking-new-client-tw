import { useRef, useState } from "react";

const TimeRange = ({ changeTime }) => {
  const startTime = useRef();
  const endTime = useRef();

  const handleTimeChange = () => {
    changeTime([startTime.current.value, endTime.current.value]);
  };

  return (
    <div className="flex items-center">
      <input
        type="time"
        onChange={handleTimeChange}
        ref={startTime}
        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <span className="mx-2">-</span>
      <input
        type="time"
        onChange={handleTimeChange}
        ref={endTime}
        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default TimeRange;
