import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SignupUser from "./pages/SignupUser";
import LoginUser from "./pages/LoginUser";
import MainUser from "./pages/MainUser";
import SignupCaptian from "./pages/SignupCaptian";
import MainCaption from "./pages/MainCaption";
import LoginCaptian from "./pages/LoginCaptian";
import { captainContext } from "./context/CaptainContext";
import AdminDashboard from "./pages/AdminDashboard";
import AllUsers from "./components/AllUsers";
import AllCaptains from "./components/AllCaptains";
import AllRides from "./components/AllRides";
import { userContext } from "./context/UserContext";

function App() {
  const { url, capLogin, setcaplogin, capsing, setcapsing } = useContext(captainContext);
  const {login, setlogin, sign, setsign, } = useContext(userContext)

  const [user, setUser] = useState(null);
  const [captain, setCaptain] = useState(null);

  const navigate = useNavigate();

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
        setCaptain(data?.captain);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // logout user

  const logout = async () => {
    try {
      const res = await fetch(`${url}/user/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        localStorage.clear();
        setUser(null);
        navigate("/login-user");
      }
    } catch (error) {
      console(error);
    }
  };
  // logout captain

  const caplogout = async () => {
    try {
      const res = await fetch(`${url}/captain/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        localStorage.clear();
        setCaptain(null);
        navigate("/login-captain");
      }
    } catch (error) {
      console(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getCaptainData(), getUserData()]);
    };

    fetchData();
  }, [ login, sign, capLogin, capsing]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/all-users" element={<AllUsers />} />
      <Route path="/all-captains" element={<AllCaptains />} />
      <Route path="/all-rides" element={<AllRides />} />
      <Route
        path="/signup-user"
        element={!user ? <SignupUser /> : <Navigate to={"/main-user"} />}
      />
      <Route
        path="/login-user"
        element={!user ? <LoginUser /> : <Navigate to={"/main-user"} />}
      />
      {user && (
        <Route
          path="/main-user"
          element={
            user ? <MainUser logout={logout} /> : <Navigate to="/" />
          }
        />
      )}

      {captain && (
        <Route
          path="/main-captain"
          element={
            captain ? (
              <MainCaption caplogout={caplogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      )}

      <Route
        path="/signup-captain"
        element={
          !captain ? <SignupCaptian /> : <Navigate to={"/main-captain"} />
        }
      />
      <Route
        path="/login-captain"
        element={
          !captain ? <LoginCaptian /> : <Navigate to={"/main-captain"} />
        }
      />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
