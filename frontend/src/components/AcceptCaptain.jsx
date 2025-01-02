import React, { useContext, useEffect } from "react";
import { userContext } from "../context/UserContext";

const AcceptCaptain = () => {
  const { rideCaptain, ride, setride, setaccept, setfindCaptian, setpicup, setshowVehicle, setconfirm, setshowStart } = useContext(userContext);

  useEffect(() => {
    setride(JSON.parse(localStorage.getItem("ride")));
  }, []);

  useEffect(() => {
    const token = Math.random();
    localStorage.setItem("otp", token);
    setaccept(true);
    setfindCaptian(false);
    setpicup(localStorage.getItem("size") <= 640 ? false : true);
    setshowVehicle(false);
    setconfirm(false);
    setshowStart(false);
  }, []);

  return (
    <div className="bg-white shadow-md border border-gray-200 px-6 py-4 rounded-lg mt-4 items-center flex flex-col gap-4">
      {/* Header */}
      <h2 className="text-xl font-bold text-blue-600">Your Driver is Ready</h2>

      {/* Captain's Details */}
      <div className="flex flex-col items-center gap-2">
        {/* Captain's Picture */}
        <img
          src={rideCaptain?.ProfileImage || "/user.png"} // Default image fallback
          alt="Captain"
          className="w-20 h-20 rounded-full shadow-md border object-cover border-gray-300"
        />

        {/* Captain's Name */}
        <h3 className="text-base font-semibold text-gray-800">
          {rideCaptain?.fullname || "Captain Name"}
        </h3>

        {/* Car Details */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">
              {rideCaptain?.vehicle?.vehicleType}
            </span>{" "}
            {rideCaptain?.vehicle?.model || "Car Model"}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Vehicle Number:</span>{" "}
            {rideCaptain?.vehicle?.numberPalte || "XX-00-XXXX"}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">VEhicle Color:</span>{" "}
            {rideCaptain?.vehicle?.color || "Color"}
          </p>
        </div>
      </div>

      {/* OTP Section */}
      <div className="bg-blue-50 border border-blue-200 px-3 py-2 rounded-md shadow-sm">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-blue-600">OTP:</span>{" "}
          {ride?.opt || ""}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Share this OTP with your driver to confirm the ride.
        </p>
      </div>
    </div>
  );
};

export default AcceptCaptain;
