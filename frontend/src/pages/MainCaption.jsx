import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import leaflet from "leaflet";
import CaptainData from "../components/CaptainData";
import RequestRide from "../components/RequestRide";
import { captainContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContex";
import Otp from "../components/Otp";
import CompletRIde from "../components/CompletRIde";
import "leaflet-routing-machine";
import AnotherRide from "../components/AnotherRide";
import UploadImage from "../components/UploadImage";

function MainCaption({ caplogout }) {
  const {
    showRequest,
    setshowRequest,
    captain,
    setcaptain,
    url,
    ride,
    setride,
    showOtppage,
    setshowOtppage,
    complet,
    setcomplet,
    viewportWidth,
    setViewportWidth,
    showCaptain,
    setshowCaptain,
    rideUser,
    setrideUser,
    distLocation,
    setdistLocation,
    picLocation,
    setpicLocation,
    anotherRide,
    setanotherRide,
    anotherRideUser,
    setanotherRideUser,
    upload,
    setupload,
  } = useContext(captainContext);
  const { socket, locationUpdate, updateSocketID } = useContext(SocketContext);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const mapRef = useRef(null);
  let ID;
  // let cancelRide;

  //  get captain data logic here

  const getCaptainData = async () => {
    try {
      const response = await fetch(`${url}/captain/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        setcaptain(data?.captain);
        ID = data.captain?._id;
        updateSocketID("captain", data.captain?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  get captain data call

  useEffect(() => {
    getCaptainData();
  }, []);

  //  update location logic here

  const update = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLng(longitude);
          locationUpdate({
            id: ID,
            location: { ltd: latitude, lng: longitude },
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  // captain location update every 5 secound

  useEffect(() => {
    setInterval(() => {
      update();
    }, 10000);
  }, []);

  // map

  useEffect(() => {
    if (!mapRef.current && lat !== 0 && lng !== 0) {
      mapRef.current = leaflet.map("map").setView([lat, lng], 10);
      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(mapRef.current);
    }
  }, [lat, lng]);

  // msrker pic and dist location

  useEffect(() => {
    if (mapRef.current && lat !== 0 && lng !== 0) {
      // Update map center when latitude or longitude changes
      mapRef.current.setView([lat, lng], 10);

      if (picLocation && distLocation) {
        // Remove existing routing control if present
        if (mapRef.current.routingControl) {
          mapRef.current.removeControl(mapRef.current.routingControl);
        }

        // Add new routing control
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
    }
  }, [lat, lng, picLocation, distLocation]);

  // socket newRide

  socket.on("newRide", (data) => {
    if (localStorage.getItem("Capride")) {
      setanotherRide(data?.newRide);
      setanotherRideUser(data?.user);
      localStorage.setItem("Anotherride", JSON.stringify(data.newRide));
      localStorage.setItem("AnotherUser", JSON.stringify(data.user));
    } else {
      setride(data?.newRide);
      localStorage.setItem("Capride", JSON.stringify(data.newRide));
      setrideUser(data?.user);
      setshowRequest(true);
      setshowCaptain(viewportWidth <= 640 ? false : true);
    }
  });

  // cancel socket

  socket.on("cancel", (data) => {
    let cancelRide = JSON.parse(localStorage.getItem("Capride"));
    let AnotherRide = JSON.parse(localStorage.getItem("Anotherride"));
    let AnotherRideUSer = JSON.parse(localStorage.getItem("AnotherUser"));
    if (cancelRide?._id === data._id) {
      localStorage.removeItem("Capride");
      setride(null);
      setrideUser(null);
      setshowRequest(false);
      setshowCaptain(viewportWidth <= 640 ? false : true);
      if (AnotherRide) {
        setride(AnotherRide);
        localStorage.setItem("Capride", JSON.stringify(AnotherRide));
        setrideUser(AnotherRideUSer);
        setshowRequest(true);
        setshowCaptain(viewportWidth <= 640 ? false : true);
        setanotherRide(null);
        setanotherRideUser(null);
        localStorage.removeItem("Anotherride");
        localStorage.removeItem("AnotherUser");
      }
    }

    if (AnotherRide) {
      if (data._id === AnotherRide._id) {
        setanotherRide(null);
        setanotherRideUser(null);
        localStorage.removeItem("Anotherride");
        localStorage.removeItem("AnotherUser");
      }
    }
  });

  // RideAcceptAnotherCaptain socket

  socket.on("RideAcceptAnotherCaptain", (acceptRide) => {
    let capride = JSON.parse(localStorage.getItem("Capride"));
    let AnotherRide = JSON.parse(localStorage.getItem("Anotherride"));
    let AnotherRideUSer = JSON.parse(localStorage.getItem("AnotherUser"));
    if (acceptRide?._id === capride?._id) {
      setshowRequest(false);
      setshowCaptain(true);
      setride(null);
      setrideUser(null);
      localStorage.removeItem("Capride");
      if (AnotherRide) {
        setride(AnotherRide);
        localStorage.setItem("Capride", JSON.stringify(AnotherRide));
        setrideUser(AnotherRideUSer);
        setshowRequest(true);
        setshowCaptain(viewportWidth <= 640 ? false : true);
        setanotherRide(null);
        setanotherRideUser(null);
        localStorage.removeItem("Anotherride");
        localStorage.removeItem("AnotherUser");
      }
    }
    if (AnotherRide) {
      if (acceptRide._id === AnotherRide?._id) {
        setanotherRide(null);
        setanotherRideUser(null);
        localStorage.removeItem("Anotherride");
        localStorage.removeItem("AnotherUser");
      }
    }
  });

  // window size chenge logic

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

  // otp page token find

  useEffect(() => {
    const token = localStorage.getItem("rideToken");

    if (token) {
      setshowOtppage(true);
      setshowCaptain(localStorage.getItem("size") <= 640 ? true : false);
      setshowRequest(false);
      setcomplet(false);
    }
  }, []);

  // complete page token find

  useEffect(() => {
    const token = localStorage.getItem("completeToken");

    if (token) {
      setcomplet(true);
      setshowOtppage(false);
      setshowCaptain(localStorage.getItem("size") <= 640 ? true : false);
      setshowRequest(false);
    }
  }, []);

  // image upload

  const hendelImage = () => {
    setupload(true);
    setshowCaptain(localStorage.getItem("size") <= 640 ? false : true);
  };

  return (
    <div className="h-screen w-full">
      {viewportWidth > 640 ? (
        <Header caplogout={caplogout} data={captain} hendelImage={hendelImage}/>
      ) : (
        <div className="flex justify-between items-center p-2 shadow-xl">
          {" "}
          <h1 className="text-2xl font-bold text-indigo-600">RideX</h1>{" "}
          <div className="flex items-center gap-4">
            <span className="h-8 w-8 rounded-full overflow-hidden" onClick={hendelImage}>
              <img
                src={captain?.ProfileImage ||"/user.png"}
                alt=""
                className="h-full rounded-full border object-cover object-center"
              />
            </span>
            <span className="text-sm font-semibold">{captain?.fullname}</span>
            <span className="h-8" onClick={caplogout}>
              <img src="/log-out.png" alt="" className="h-full" />
            </span>
          </div>
        </div>
      )}
      <div
        className={`flex flex-col-reverse sm:flex-row w-full ${
          viewportWidth > 640 ? "h-[90%]" : "h-[90%]"
        } `}
      >
        <div className="w-full sm:w-[40%] lg:w-[30%] mx-auto">
          <div className="w-[90%] 2xl:w-[80%] mx-auto">
            {showCaptain && <CaptainData />}
          </div>

          {showRequest && (
            <div className="w-[90%] 2xl:w-[80%] mx-auto">
              <RequestRide />
            </div>
          )}
          {showOtppage && (
            <div className="w-[90%] 2xl:w-[80%] mx-auto">
              <Otp />
            </div>
          )}
          {complet && (
            <div className="w-[90%] 2xl:w-[80%] mx-auto">
              <CompletRIde />
            </div>
          )}

          {anotherRide && (
            <div className="w-[90%] 2xl:w-[80%] mx-auto">
              <AnotherRide />
            </div>
          )}
          {upload && (
            <div className="w-[90%] 2xl:w-[80%] mx-auto">
              <UploadImage/>
            </div>
          )}
        </div>

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

export default MainCaption;
