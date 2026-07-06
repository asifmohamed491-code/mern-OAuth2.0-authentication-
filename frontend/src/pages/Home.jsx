import React from "react";
import { Link } from "react-router-dom";
import { HiBadgeCheck } from "react-icons/hi";


const Home = ({ user, error }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center">

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {user ? (
          <>
            {/* Avatar */}

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center text-4xl font-bold mx-auto mb-6">
              {user.username?.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-3xl font-bold text-gray-800 ">
              Welcome, {user.username} 
            </h1>

            <p className="text-gray-500 mt-2">
              Glad to see you back!
            </p>

            {/* User Info */}

            <div className="mt-8 bg-gray-50 rounded-2xl p-6 text-left">

              <div className="flex justify-between py-2 border-b">
                <span className="font-semibold text-gray-600">
                  Username
                </span>

                <span className="text-gray-800">
                  {user.username}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b">
                <span className="font-semibold text-gray-600">
                  Email
                </span>

                <span className="text-gray-800 break-all">
                  {user.email}
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-600">
                  Status
                </span>

                <span className="text-green-600 font-semibold flex items-center gap-0.5">
                  <HiBadgeCheck /> Authenticated
                </span>
              </div>

            </div>
          </>
        ) : (
          <>
            <div className="text-6xl mb-6">
              🔐
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
              Welcome
            </h1>

            <p className="text-gray-500 mt-3">
              Login or create a new account to continue.
            </p>

            <div className="mt-8 flex flex-col gap-4">

              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="border border-gray-300 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                Create Account
              </Link>

            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default Home;