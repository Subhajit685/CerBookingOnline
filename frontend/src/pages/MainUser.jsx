import React, { useContext, useEffect, useRef, useState } from "react";
import leaflet from "leaflet";
import Header from "../components/Header";
import PicAndDist from "../components/PicAndDist";
import VehicleList from "../components/VehicleList";
import { userContext } from "../context/UserContext";
import Confirm from "../components/Confirm";
import FindCaptain from "../components/FindCaptain";
import { SocketContext } from "../context/SocketContex";
import AcceptCaptain from "../components/AcceptCaptain";
import Start from "../components/Start";
import "leaflet-routing-machine";
import UserUploadImage from "../components/UserUploadImage";

function MainUser({ logout }) {
  const { user, setuser, url } = useContext(userContext);
  const { socket, updateSocketID } = useContext(SocketContext);
  const {
    showVehicle,
    fare,
    time,
    distance,
    confirm,
    setconfirm,
    vehicle,
    setvehicle,
    findcaptian,
    setfindCaptian,
    picLocation,
    accept,
    setaccept,
    rideCaptain,
    distLocation,
    setrideCaptain,
    showStart,
    setshowStart,
    picup,
    setpicup,
    viewportWidth,
    setViewportWidth,
    setshowVehicle,
    upload,
    setupload,
  } = useContext(userContext);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const mapRef = useRef(null);
  const [ride, setride] = useState({});

  // get user data logic

  const getUserData = async () => {
    try {
      const response = await fetch(`${url}/user/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        updateSocketID("user", data.user?._id);
        setuser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // call get user data

  useEffect(() => {
    getUserData();
  }, []);

  // geo location

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLng(longitude);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  // map and merkar

  useEffect(() => {
    if (!mapRef.current && lat !== 0 && lng !== 0) {
      // Initialize the map
      mapRef.current = leaflet.map("map").setView([lat, lng], 10);
      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(mapRef.current);
    }

    // Add routing control when both locations are set
    if (mapRef.current && picLocation && distLocation) {
      // Remove existing routing control if present
      if (mapRef.current.routingControl) {
        mapRef.current.removeControl(mapRef.current.routingControl);
      }

      // Add new routing control without navigation bar
      const routingControl = leaflet.Routing.control({
        waypoints: [
          leaflet.latLng(picLocation.lat, picLocation.lng),
          leaflet.latLng(distLocation.lat, distLocation.lng),
        ],
        routeWhileDragging: true,
        show: false, // Hides the navigation bar
      }).addTo(mapRef.current);

      // Store routing control instance in the mapRef for future removal
      mapRef.current.routingControl = routingControl;
    }
  }, [lat, lng, picLocation, distLocation]);

  // accept ride socket

  socket.on("accept", (data) => {
    localStorage.removeItem("find");
    setrideCaptain(data);
    localStorage.setItem("rideCaptain", JSON.stringify(data));
    setaccept(true);
    setfindCaptian(false);
  });

  // start ride socket

  socket.on("start", (data) => {
    localStorage.removeItem("otp");
    setride(data);
    setaccept(false);
    setshowStart(true);
  });

  socket.on("complete", (data) => {
    if (data) {
      localStorage.removeItem("start");
      localStorage.removeItem("ride");
      localStorage.removeItem("rideCaptain");
      setshowStart(false);
      setpicup(true);
    }
  });

  // screen size update

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      localStorage.setItem("size", window.innerWidth);
    };

    // Add the resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // token for fing page

  useEffect(() => {
    const token = localStorage.getItem("find");

    if (token) {
      setfindCaptian(true);
      setpicup(localStorage.getItem("size") <= 640 ? false : true);
      setshowVehicle(false);
      setconfirm(false);
      setaccept(false);
      setshowStart(false);
    }
  }, []);

  // accept page tken

  useEffect(() => {
    const token = localStorage.getItem("otp");

    if (token) {
      setaccept(true);
      setfindCaptian(false);
      setpicup(localStorage.getItem("size") <= 640 ? false : true);
      setshowVehicle(false);
      setconfirm(false);
      setshowStart(false);
    }
  }, []);

  // start page token

  useEffect(() => {
    const token = localStorage.getItem("start");

    if (token) {
      setshowStart(true);
      setaccept(false);
      setfindCaptian(false);
      setpicup(localStorage.getItem("size") <= 640 ? false : true);
      setshowVehicle(false);
      setconfirm(false);
    }
  }, []);

  const hendelImage = () => {
    setupload(true);
    setpicup(localStorage.getItem("size") <= 640 ? false : true);
  };

  return (
    <div className="h-screen w-full">
      {viewportWidth > 640 ? (
        <Header caplogout={logout} data={user} hendelImage={hendelImage} />
      ) : (
        <div className="flex justify-between items-center p-2 shadow-xl">
          {" "}
          <h1 className="text-2xl font-bold text-indigo-600">RideX</h1>{" "}
          <div className="flex items-center gap-4">
            {" "}
            <span
              className="h-8 w-8 rounded-full overflow-hidden"
              onClick={hendelImage}
            >
              <img
                src={user?.profileImage || "/user.png"}
                alt=""
                className="h-full rounded-full border object-cover object-center"
              />
            </span>
            <span className="text-sm font-semibold">{user?.fullname}</span>
            <span className="h-8" onClick={logout}>
              <img src="/log-out.png" alt="" className="h-full" />
            </span>
          </div>
        </div>
      )}

      <div
        className={`flex flex-col-reverse sm:flex-row w-full ${
          viewportWidth > 640 ? "h-[90%]" : "h-[92%]"
        }`}
      >
        {/* picup and distination */}

        <div className="sm:w-[40%] lg:w-[30%]">
          <div className="">{picup && <PicAndDist />}</div>

          {showVehicle ? (
            <div className="w-[90%] 2xl:w-[80%] mx-auto mb-3">
              <p className="text-xl font-semibold text-left text-gray-700 my-4">
                Choose a vehicle for your ride:
              </p>
              <VehicleList
                image={"/car.webp"}
                time={time}
                dist={distance}
                fare={fare.car}
                vehicle={"car"}
              />
              <VehicleList
                image={"/auto.webp"}
                time={time}
                dist={distance}
                fare={fare.auto}
                vehicle={"auto"}
              />
              <VehicleList
                image={"/bike.webp"}
                time={time}
                dist={distance}
                fare={fare.motorcycle}
                vehicle={"motorcycle"}
              />
            </div>
          ) : null}

          {confirm ? (
            <div className="w-[90%] 2xl:w-[80%] mx-auto">
              <Confirm
                time={time}
                dist={distance}
                fare={fare[vehicle]}
                vehicle={vehicle}
              />
            </div>
          ) : null}

          {findcaptian ? (
            <div className="w-[90%] 2xl:w-[80%] mx-auto">
              <FindCaptain />
            </div>
          ) : null}

          {accept ? (
            <div className="w-[90%] 2xl:w-[80%] mb-3 mx-auto">
              <AcceptCaptain />
            </div>
          ) : null}

          {showStart && (
            <div className="w-[90%] 2xl:w-[80%] mx-auto">
              <Start ride={ride} />
            </div>
          )}
          {upload && (
            <div className="w-[90%] 2xl:w-[80%] mx-auto">
              <UserUploadImage/>
            </div>
          )}
        </div>

        {/* map */}

        <div className="w-full sm:w-[60%] lg:w-[70%] h-full sm:p-4 lg:p-10">
          <div id="map" className="h-full w-full sm:rounded-xl"></div>
        </div>
      </div>

      <footer className="bg-gray-800 text-gray-300 py-4 w-full hidden sm:block">
        <div className="container mx-auto text-center">
          <p>© 2024 RideX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default MainUser;
