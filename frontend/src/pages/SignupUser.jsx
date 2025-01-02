import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { userContext } from "../context/UserContext";
import Header from "../components/Header";

function SignupUser() {
    const { setuser, sign, setsign } = useContext(userContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
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
      const res = await fetch(`https://cerbookingonline.onrender.com/user/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: formData.name,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setuser(data.user);
        navigate("/main-user");
        setsign(true)
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
          <span className="text-xs text-red-900">{error}</span>
        ) : (
          <span></span>
        )}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="enter your name"
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
              placeholder="enter your email"
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
          {/* Gender */}
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
          Already have an account ?{" "}
          <Link to={"/login-user"} className="hover:text-blue-600">
            Login
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

export default SignupUser;
