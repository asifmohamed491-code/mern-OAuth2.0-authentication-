import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-md w-full">

        <div className="text-7xl mb-4">😵</div>

        <h1 className="text-6xl font-extrabold text-blue-600">
          404
        </h1>

        <h2 className="text-2xl font-bold text-gray-800 mt-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition duration-300"
        >
          ⬅ Back to Home
        </Link>

      </div>

    </div>
  );
};

export default Notfound;