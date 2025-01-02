import React, { useContext, useEffect } from "react";
import Spinner from "./Spinner";
import { userContext } from "../context/UserContext";

function FindCaptain() {
  const {url, setfindCaptian, setpicup, setshowVehicle, setconfirm, setaccept, setshowStart} = useContext(userContext)
  const handleCancel = async() => {
    const ride = JSON.parse(localStorage.getItem("ride"))
    try {
      const res = await fetch(`${url}/ride/cancel`,{
        method : "POST",
        credentials : "include",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({rideID : ride?._id})
      })

      const data = await res.json()

      if(data.success){
        localStorage.removeItem("ride")
        localStorage.removeItem("find")
        setfindCaptian(false)
        setpicup(true)
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{
    const token = Math.random()
    localStorage.setItem("find", token)
    setfindCaptian(true)
    setpicup(localStorage.getItem("size") <=640 ? false : true)
    setshowVehicle(false)
    setconfirm(false)
    setaccept(false)
    setshowStart(false)
  },[])

  return (
    <div className="bg-white shadow-md border border-gray-200 px-8 py-6 rounded-lg mt-5 flex flex-col items-center gap-6 hover:shadow-lg transition-shadow duration-200 mb-3">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800">Looking for a Driver</h2>

      {/* Subtext */}
      <p className="text-gray-600 text-center">
        Please wait while we find the nearest available driver for you. This may take a moment.
      </p>

      {/* Spinner with Message */}
      <div className="flex justify-center items-center gap-4 bg-blue-600 text-white py-3 px-6 rounded-full shadow-md">
        <Spinner msg={"Finding..."} />
      </div>

      {/* Cancel Button */}
      <button
        onClick={handleCancel}
        className="bg-red-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-red-600 transition-colors duration-200"
      >
        Cancel
      </button>
    </div>
  );
}

export default FindCaptain;
