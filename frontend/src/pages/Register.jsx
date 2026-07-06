import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
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

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post("/api/users/register", formData);

      console.log(res.data);
      setError("");

      alert("Registered Successfully!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || "Register Failed");
    }
  };

  const handleGoogleRegister = () => {
    console.log("Google Register Clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

        {/* Header */}
        <div className="text-center mb-5">
          <div className="w-14 h-14 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl mb-3">
            <FaUser />
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            Create Account
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Register to get started
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm rounded-lg p-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <p className="text-xs text-gray-500 mb-4">
            Password must be at least 6 characters.
          </p>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Create Account
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1" />
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-1" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-3 hover:bg-gray-50 transition"
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

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?

          <span
            onClick={() => navigate("/login")}
            className="ml-1 text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
};

export default Register;