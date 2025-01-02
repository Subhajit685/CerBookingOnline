import React, { useContext } from "react";
import { captainContext } from "../context/CaptainContext";

function AnotherRide() {
  const {
    anotherRide,
    setanotherRide,
    setride,
    setrideUser,
    setshowRequest,
    setshowCaptain,
    anotherRideUser,
    setanotherRideUser,
    viewportWidth,
  } = useContext(captainContext);

  const hendleClick = () => {
    let AnotherRide = JSON.parse(localStorage.getItem("Anotherride"));
    let AnotherRideUSer = JSON.parse(localStorage.getItem("AnotherUser"));
    setanotherRide(null);
    setanotherRideUser(null);
    setride(AnotherRide);
    setrideUser(AnotherRideUSer);
    localStorage.setItem("Capride", JSON.stringify(AnotherRide));
    setshowRequest(true);
    setshowCaptain(viewportWidth < 640 ? false : true);
    localStorage.removeItem("Anotherride");
    localStorage.removeItem("AnotherUser");
  };

  return (
    <div
      className="border cursor-pointer border-gray-200 px-6 py-4 rounded-lg mt-4 flex flex-col gap-4 shadow-md w-full max-w-md bg-white mb-3"
      onClick={hendleClick}
    >
      <div className="flex flex-col gap-2 text-gray-700">
        <div className="flex justify-between">
          <span className="text-xs font-medium text-blue-600">
            Another ride create. If you want to go this ride click this ride
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-semibold">
            {anotherRide?.startLocation}
          </span>
          <span className="text-sm font-semibold">
            {anotherRide?.endLocation}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Fare:</span>
          <span className="text-sm font-semibold text-green-600">
            {" "}
            ₹ {anotherRide?.fare}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AnotherRide;
