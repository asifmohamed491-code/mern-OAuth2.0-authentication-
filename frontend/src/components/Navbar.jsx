import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/users/logout",
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("accessToken");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          MERN OAuth2.0
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {user ? (
            <>
              {/* Profile */}
              <div className="flex items-center gap-3">

                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-11 h-11 rounded-full object-cover border-2 border-blue-500 shadow"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg uppercase">
                    {user.username?.charAt(0)}
                  </div>
                )}

                <div className="hidden sm:flex flex-col">
                  <span className="text-sm font-semibold text-gray-800">
                    {user.username}
                  </span>

                  <span className="text-xs text-gray-500">
                    {user.email}
                  </span>
                </div>

              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium transition shadow-md cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl font-medium hover:scale-105 transition shadow-md"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;