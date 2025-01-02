import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import { captainContext } from "../context/CaptainContext";

function SignupCaptian() {

  const {setcaptain, capsing, setcapsing} = useContext(captainContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    licence: "",
  });
  const [vehicle, setvehicle] = useState({
    vehicleType: "",
    color: "",
    numberPalte: "",
    capacity: "",
    model: "",
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

  const hendleVehicle = (e) => {
    const { name, value } = e.target;
    setvehicle((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setloading(true);
    seterror(false);
    try {
      const res = await fetch(`http://localhost:4000/captain/create`, {
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
          licence : formData.licence,
          vehicle,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setcaptain(data.captain); 
        navigate("/main-captain");
        setcapsing(true)
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
      className="h-screen flex flex-col gap-10 items-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/home1.png')",
      }}
    >
        <Header/>
      <div className="h-[70%] overflow-y-scroll max-w-lg bg-white/90 rounded-lg p-8 border">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Make a Ride
        </h2>
        {error ? (
          <span className="text-xs text-red-900">{error}</span>
        ) : (
          <span></span>
        )}
        <form onSubmit={handleSubmit}>
            <p className="text-xl font-bold text-center text-gray-800 mb-6">Personal Information</p>
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

          {/* vehicle  */}
          <p className="text-xl font-bold text-center text-gray-800 mb-6">Vehicle Information</p>
          <div className="flex gap-2">
            {/* type  */}

            <div className="mb-4">
              <label
                htmlFor="vehicleType"
                className="block text-sm font-medium text-gray-700"
              >
                Vehicle Type
              </label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={vehicle.vehicleType}
                onChange={hendleVehicle}
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            {/* color  */}

            <div className="mb-4">
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700"
              >
                Color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={vehicle.color}
                onChange={hendleVehicle}
                placeholder="color"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {/* number plate */}

            <div className="mb-4">
              <label
                htmlFor="numberPalte"
                className="block text-sm font-medium text-gray-700"
              >
                Number Palte
              </label>
              <input
                type="text"
                id="numberPalte"
                name="numberPalte"
                value={vehicle.numberPalte}
                onChange={hendleVehicle}
                placeholder="number palte"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* capacity  */}

            <div className="mb-4">
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-gray-700"
              >
                Capacity
              </label>
              <input
                type="text"
                id="capacity"
                name="capacity"
                value={vehicle.capacity}
                onChange={hendleVehicle}
                placeholder="capacity"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* licence */}

          <div className="mb-4">
            <label
              htmlFor="licence"
              className="block text-sm font-medium text-gray-700"
            >
              Licence Number
            </label>
            <input
              type="text"
              id="licence"
              name="licence"
              value={formData.licence}
              onChange={handleChange}
              placeholder="enter your licence number"
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* modle name */}

          <div className="mb-4">
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700"
            >
              Vehicle Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={vehicle.model}
              onChange={hendleVehicle}
              placeholder="enter your car model"
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
              {loading ? <Spinner /> : "Make a Ride"}
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

export default SignupCaptian;
