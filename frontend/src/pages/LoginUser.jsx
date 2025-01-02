import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { userContext } from "../context/UserContext";
import Header from "../components/Header";

function LoginUser() {
    const { setuser, login, setlogin } = useContext(userContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    seterror(false);
    try {
      const res = await fetch(`http://localhost:4000/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setuser(data.user);
        navigate("/main-user");
        setlogin(true)
      } else {
        seterror(data.message);
      }
    } catch (error) {
      console.log(error);
      seterror(data.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between bg-cover bg-center"
      style={{
        backgroundImage: "url('/home1.png')",
      }}
    >
      <Header/>
      <div className="w-full max-w-lg bg-white/90 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Book a Ride
        </h2>
        {error ? (
          <span className="text-xs text-red-900">**{error}**</span>
        ) : (
          <span></span>
        )}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="enter your name"
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-md shadow-lg hover:from-blue-600 hover:to-blue-700 transition flex justify-center items-center"
            >
              {loading ? <Spinner /> : "Book a Ride"}
            </button>
          </div>
        </form>
        <p className="text-sm py-4 text-red-700">
          New user ?{" "}
          <Link to={"/signup-user"} className="hover:text-blue-600">
            Sign up
          </Link>
        </p>
      </div>

      <footer className="bg-gray-800 text-gray-300 py-4 w-full">
                <div className="container mx-auto text-center">
                    <p>© 2024 RideX. All rights reserved.</p>
                </div>
            </footer>
    </div>
  );
}

export default LoginUser;
