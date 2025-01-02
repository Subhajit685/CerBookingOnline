import React, { useContext, useState } from "react";
import { userContext } from "../context/UserContext";
import Spinner from "./Spinner";

function Confirm(props) {
  const {
    url,
    fromData,
    findcaptian,
    setfindCaptian,
    ride,
    setride,
    setconfirm,
    picLocation,
    distLocation,
    setshowVehicle
  } = useContext(userContext);
  const vehicleImage = {
    car: "/car.webp",
    auto: "/auto.webp",
    motorcycle: "/bike.webp",
  };

  const [loading, setloading] = useState(false);

  const hendleConfirm = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await fetch(`${url}/ride/createride`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pic: fromData.pic,
          dis: fromData.dist,
          fare: Math.floor(props.fare),
          vehicle: props.vehicle,
          distance: props.dist,
          picLocation,
          distLocation,
        }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("ride", JSON.stringify(data.newRide))
        setride(data.newRide);
        setfindCaptian(true);
        setconfirm(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="border bg-white border-gray-300 px-8 py-4 mb-3 rounded-lg mt-5 items-center cursor-pointer flex flex-col gap-4 sm:gap-6 relative">
      <div className="h-6 mt-3 ms-3 absolute left-0 top-0" onClick={()=>{
        setconfirm(false)
        setshowVehicle(true)
      }}>
        <img src="/back.png" alt="" className="h-full" />
      </div>
      <div className="h-20 sm:h-28">
        <img src={vehicleImage[props.vehicle]} className="h-full" alt="image" />
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="text-lg font-semibold">{props.dist}</div>
        <div className="text-sm">{props.time}</div>
      </div>
      <div>
        <span className="text-lg font-semibold">
          Cash : ₹ {Math.floor(props.fare)}
        </span>
      </div>

      <button
        onClick={hendleConfirm}
        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg mt-3 sm:mt-5 hover:bg-green-700 transition duration-200 flex justify-center items-center"
      >
        {loading ? <Spinner /> : "Confirm"}
      </button>
    </div>
  );
}

export default Confirm;
