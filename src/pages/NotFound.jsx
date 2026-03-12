import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className={
        "min-h-screen transition-colors duration-300 flex flex-col justify-center items-center relative "
      }
    >
      <img src="./notFound.png" alt="Error" className="w-200" />
      <Link
        to="/"
        className="mt-2 px-6 py-2.5 rounded-lg font-medium
        bg-linear-to-r from-blue-500 to-indigo-500
      hover:from-indigo-500 hover:to-blue-500
      text-white transition-all duration-300 absolute bottom-20"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
