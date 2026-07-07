import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef();

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

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          MERN OAuth2.0
        </Link>

        {user ? (
          <div className="relative" ref={menuRef}>

            {/* Avatar */}
            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-11 h-11 rounded-full border-2 border-blue-500 object-cover shadow hover:scale-105 transition"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg uppercase">
                  {user.username.charAt(0)}
                </div>
              )}
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border overflow-hidden">

                <div className="p-5 flex items-center gap-3">

                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-14 h-14 rounded-full border-2 border-blue-500 object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                      {user.username.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {user.username}
                    </h3>

                    <p className="text-xs text-gray-500 break-all">
                      {user.email}
                    </p>
                  </div>

                </div>

                <hr />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  <FaSignOutAlt />
                  Logout
                </button>

              </div>
            )}

          </div>
        ) : (
          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition"
            >
              Register
            </Link>

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;