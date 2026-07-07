import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/users/login", formData, {
        withCredentials: true,
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google Login Clicked");
    window.location.href = "http://localhost:5000/api/auth/google";
    // Google OAuth logic later
  };

  return (
    <div className="h-dvh overflow-hidden bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 md:p-8">

        {/* Header */}

        <div className="text-center mb-6">

          <div className="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl md:text-2xl mb-3">
            <FaLock />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Login to continue
          </p>

        </div>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="mb-4">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 p-3 text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />

          </div>

          {/* Password */}

          <div className="mb-3">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 p-3 text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />

          </div>

          {/* Forgot Password */}

          <div className="text-right mb-5">

            <button
              type="button"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot Password?
            </button>

          </div>

          {/* Login */}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition duration-300"
          >
            Login
          </button>

        </form>

        {/* Divider */}

        <div className="flex items-center my-5">

          <hr className="flex-1 border-gray-300" />

          <span className="mx-4 text-sm text-gray-400">
            OR
          </span>

          <hr className="flex-1 border-gray-300" />

        </div>

        {/* Google */}

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />

          <span className="font-medium text-gray-700">
            Continue with Google
          </span>

        </button>

        {/* Register */}

        <p className="text-center text-sm text-gray-500 mt-5">

          Don't have an account?

          <span
            onClick={() => navigate("/register")}
            className="ml-1 text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>

        </p>

      </div>

    </div>
  );
};

export default Login;