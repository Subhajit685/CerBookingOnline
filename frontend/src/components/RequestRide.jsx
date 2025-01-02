import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContex";
import { captainContext } from "../context/CaptainContext";
import Spinner from "./Spinner";

function RequestRide() {
  const {
    setshowCaptain,
    captain,
    ride,
    url,
    showOtppage,
    setshowOtppage,
    setshowRequest,
    rideUser,
    setrideUser,
    anotherRide,
    setanotherRide,
    setanotherRideUser,
  } = useContext(captainContext);
  const [loading, setloading] = useState(false);

  const hendelClick = async () => {
    setloading(true);
    try {
      const res = await fetch(`${url}/ride/accept`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: ride._id }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("rideId", ride._id);
        setshowRequest(false);
        setshowOtppage(true);
        setanotherRide(null);
        setanotherRideUser(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="border border-gray-200 px-6 py-4 rounded-lg mt-4 flex flex-col gap-4 shadow-md w-full max-w-md bg-white mb-3">
      {/* Header Section */}
      <div className="flex items-center gap-4 bg-yellow-300 p-3 rounded-md shadow-sm">
        <div className="h-16 w-16 border rounded-full overflow-hidden bg-yellow-50">
          <img
            src={rideUser?.profileImage || "/user.png"}
            className="h-full w-full object-cover"
            alt="User Avatar"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-700">
            {rideUser?.fullname}
          </span>
          <span className="text-sm text-gray-600">Ride Request</span>
        </div>
      </div>

      {/* Ride Details */}
      <div className="flex flex-col gap-2 text-gray-700">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Pickup Location:</span>
          <span className="text-sm font-semibold">{ride?.startLocation}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Drop Location:</span>
          <span className="text-sm font-semibold">{ride?.endLocation}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Fare:</span>
          <span className="text-sm font-semibold text-green-600">
            {" "}
            ₹ {ride?.fare}
          </span>
        </div>
      </div>

      {/* Action Buttons */}

        <div className="flex gap-2">
          <button
            className="bg-green-500 hover:bg-green-600 flex-1 p-3 rounded-md text-white font-semibold shadow-sm flex justify-center items-center"
            onClick={hendelClick}
          >
            {loading ? <Spinner /> : "Accept"}
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 flex-1 p-3 rounded-md text-white font-semibold shadow-sm"
            onClick={() => {
              setshowRequest(false);
              setshowCaptain(true);
            }}
          >
            Ignore
          </button>
        </div>
    </div>
  );
}

export default RequestRide;
