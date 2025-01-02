import React, { useContext, useState } from "react";
import { userContext } from "../context/UserContext";
import Spinner from "./Spinner";
import leaflet from "leaflet"; // Consider adding an actual use of leaflet for interactive maps
import citys from "./list";

function PicAndDist() {
  // Extract values from context
  const {
    url,
    time,
    settime,
    distance,
    setdistance,
    fare,
    setfare,
    showVehicle,
    setshowVehicle,
    fromData,
    setfromData,
    picLocation,
    setpicLocation,
    setdistLocation,
    picup,
    setpicup,
    viewportWidth,
    setViewportWidth,
  } = useContext(userContext);

  const [valu, setvalu] = useState([]);
  const [distvalu, setdistvalu] = useState([]);

  function getMatchingData(dataArray, userInput) {
    // Ensure userInput is a string and convert to lowercase for case-insensitive matching
    const input = userInput.toLowerCase();

    // Filter the array for matches where strings start with the input
    const matches = dataArray.filter((item) =>
      item.toLowerCase().startsWith(input)
    );

    // Limit the results to 5 items
    return matches.slice(0, 5);
  }

  // Handle input changes
  const onChenge = (e) => {
    setfromData({
      ...fromData,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setloading] = useState(false);

  // Fetch coordinates for the pickup location
  const getPicLocation = async () => {
    try {
      const res1 = await fetch(`${url}/map/codrinate?address=${fromData.pic}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data1 = await res1.json();

      if (data1.success) {
        setpicLocation(data1.location);
      }
    } catch (error) {
      console.log("Error fetching pickup location:", error);
    }
  };

  // Fetch coordinates for the destination location
  const getDistLocation = async () => {
    try {
      const res2 = await fetch(
        `${url}/map/codrinate?address=${fromData.dist}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data2 = await res2.json();

      if (data2.success) {
        setdistLocation(data2.location);
      }
    } catch (error) {
      console.log("Error fetching destination location:", error);
    }
  };

  // Calculate distance, time, and fare
  const getDistance = async () => {
    try {
      const res = await fetch(
        `${url}/map/distance?pic=${fromData.pic}&dis=${fromData.dist}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (data.success) {
        setdistance(data.distance.distance);
        settime(data.distance.duration);
        setfare(data.distance.fare);
        setshowVehicle(true);
        setpicup(localStorage.getItem("size") <= 640 ? false : true);
      }
    } catch (error) {
      console.log("Error fetching distance data:", error);
    }
  };

  // Form submission handler
  const onsubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      await getPicLocation();
      await getDistLocation();
      await getDistance();
    } catch (error) {
      console.log("Error submitting form:", error);
    } finally {
      setloading(false);
    }
  };

  // hendel city

  const hendelCity = (item) => {
    fromData.pic = item;
    setvalu([]);
  };

  const hendelCityDist = (item) => {
    fromData.dist = item;
    setdistvalu([]);
  };

  return (
    <div className="h-full w-full pb-3">
      <div className="flex flex-col items-center gap-1 rounded-lg">
        {valu &&
          valu.map((item, index) => (
            <div key={index} className="w-full flex flex-col items-center">
              <div
                className="text-md font-semibold py-2 text-gray-800 cursor-pointer"
                onClick={() => hendelCity(item)}
              >
                {item}
              </div>
              <div className="w-full h-[1px] bg-gradient-to-r bg-gray-300"></div>
            </div>
          ))}

        {distvalu &&
          distvalu.map((item, index) => (
            <div key={index} className="w-full flex flex-col items-center">
              <div
                className="text-md font-semibold py-2 text-gray-800"
                onClick={() => hendelCityDist(item)}
              >
                {item}
              </div>
              <div className="w-full h-[1px] bg-gradient-to-r bg-gray-300"></div>
            </div>
          ))}
      </div>
      {/* Header */}
      <p className="text-2xl font-semibold text-center mt-4">Ride with us</p>

      {/* Form */}
      <form className="mx-auto" onSubmit={onsubmit}>
        {/* Pickup Location */}
        <div className="w-[90%] xl:w-[80%] mx-auto mt-5">
          <input
            type="text"
            name="pic"
            value={fromData.pic}
            required
            onChange={(e) => {
              onChenge(e);
              setvalu(getMatchingData(citys, fromData.pic));
            }}
            className="bg-gray-200 w-full h-12 px-8 rounded-md"
            placeholder="Pickup location"
          />
        </div>

        {/* Destination Location */}
        <div className="w-[90%] xl:w-[80%] mx-auto mt-5">
          <input
            type="text"
            name="dist"
            value={fromData.dist}
            required
            onChange={(e) => {
              onChenge(e);
              setdistvalu(getMatchingData(citys, fromData.dist));
            }}
            className="bg-gray-200 w-full h-12 px-8 rounded-md"
            placeholder="Destination location"
          />
        </div>

        {/* Submit Button */}
        <div className="w-[90%] xl:w-[80%] mx-auto mt-5">
          <button className="w-full h-12 rounded-md bg-black text-white flex justify-center items-center">
            {loading ? <Spinner /> : "Find a Ride"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PicAndDist;
