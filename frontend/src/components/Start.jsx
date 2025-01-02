import React, { useContext, useEffect } from "react";
import { userContext } from "../context/UserContext";

function Start({ ride }) {
  const { rideCaptain, setrideCaptain, setaccept, setfindCaptian, setpicup, setshowVehicle, setconfirm, setshowStart } = useContext(userContext);

  useEffect(() => {
    setrideCaptain(JSON.parse(localStorage.getItem("rideCaptain")));
  }, []);

  useEffect(() => {
    const token = Math.random();
    localStorage.setItem("start", token);
    setshowStart(true);
    setaccept(false);
    setfindCaptian(false);
    setpicup(localStorage.getItem("size") <= 640 ? false : true);
    setshowVehicle(false);
    setconfirm(false);
  }, []);

  return (
    <div className="bg-white shadow-md border border-gray-200 px-8 py-6 rounded-lg mt-5 flex flex-col items-center gap-6 hover:shadow-lg transition-shadow duration-200">
      {/* Ride Details */}
      <div className="text-sm font-semibold text-gray-800">
        <p className="text-gray-500">
          <span className="font-medium text-blue-600">Ride from:</span>
          <span className="ml-2 text-blue-800">{ride?.startLocation}</span>
        </p>
        <p className="text-gray-500">
          <span className="font-medium text-blue-600">To:</span>
          <span className="ml-2 text-blue-800">{ride?.endLocation}</span>
        </p>
      </div>

      {/* Captain Info */}
      <div className="text-sm font-semibold text-gray-800">
        <p className="text-gray-500">
          🧑‍✈️<span className="font-medium text-green-600">Captain:</span>
          <span className="ml-2 capitalize text-green-700">
            {rideCaptain?.fullname}
          </span>
        </p>
      </div>

      {/* Make Payment Button */}
      <div className="flex justify-center items-center">
        <button
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-600 transition-all text-sm"
          onClick={() => alert("Payment feature coming soon!")}
        >
          💳 Make Payment
        </button>
      </div>

      {/* Note */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        <p className="italic">
          Make sure all details are correct before starting the ride.
        </p>
      </div>
    </div>
  );
}

export default Start;
