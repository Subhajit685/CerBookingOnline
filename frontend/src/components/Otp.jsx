import React, { useContext, useEffect, useState } from "react";
import { captainContext } from "../context/CaptainContext";
import Spinner from "./Spinner";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const {
    ride,
    url,
    setshowOtppage,
    complet,
    setcomplet,
    distLocation,
    setdistLocation,
    picLocation,
    setpicLocation,
    setshowCaptain,
    setshowRequest
  } = useContext(captainContext);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await fetch(`${url}/ride/submitotp`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otp, rideID: localStorage.getItem("rideId") }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.removeItem("rideToken")
        setshowOtppage(false);
        setcomplet(true);
        setdistLocation(data?.ride?.endLatLng);
        setpicLocation(data?.ride?.startLatLng);
      } else {
        seterror(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    // Set token in local storage on success
    const token = Math.random();
    localStorage.setItem("rideToken", token);
    setshowOtppage(true)
    setshowCaptain(localStorage.getItem("size") <= 640 ? false : true)
    setshowRequest(false)
    setcomplet(false)
  }, []);

  return (
    <div className="border border-gray-200 px-6 py-4 rounded-lg my-2 flex flex-col justify-center items-center gap-4 shadow-md w-full max-w-md bg-white">
      <div className="bg-white p-8 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Enter OTP to Start Ride
        </h2>
        {error && (
          <p className="text-sm text-red-600 text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            required
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-semibold flex justify-center items-center transition-all duration-200"
          >
            {loading ? <Spinner /> : "Submit OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
