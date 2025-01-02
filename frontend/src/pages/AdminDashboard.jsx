import React, { useEffect, useState } from "react";
import DashboardSummaryCard from "./DashboardSummaryCard";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Spinner from "../components/Spinner";

function AdminDashboard() {
  const navigate = useNavigate();
  const [totalUsers, settotalUsers] = useState(0);
  const [totalCaptains, settotalCaptains] = useState(0);
  const [totalRides, settotalRides] = useState(0);
  const [id, setid] = useState("");
  const [type, settype] = useState("");
  const [loading, setloading] = useState(false)
  const  [idInactive, setidInactive] = useState("")
  const  [loading2, setloading2] = useState(false)

  const allUser = async () => {
    try {
      const res = await fetch(`https://cerbookingonline.onrender.com/admin/allsuer`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        settotalUsers(data.users.length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const allCaptain = async () => {
    try {
      const res = await fetch(`https://cerbookingonline.onrender.com/admin/allcaptain`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        settotalCaptains(data.captains.length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const allRide = async () => {
    try {
      const res = await fetch(`https://cerbookingonline.onrender.com/admin/allride`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        settotalRides(data.rides.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await Promise.all([allCaptain(), allRide(), allUser()]);
    }

    fetchData();
  });

  // Data for the chart
  const data = [
    { name: "Users", value: totalUsers },
    { name: "Captains", value: totalCaptains },
    { name: "Rides", value: totalRides },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const hendelsubmit = async(e) => {
    e.preventDefault()
    setloading(true)
    try {
      const res = await fetch(`https://cerbookingonline.onrender.com/admin/updateadmin`,{
        method : "POST",
        credentials : 'include',
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({id, type})
      })

      const data = await res.json()
      if(data.success){
        setid("")
        settype("")
        setloading(false)
        alert("Admin Update")
      }
    } catch (error) {
      console.log(error)
    }
  };

  const hendelinactive = async(e) => {
    e.preventDefault()
    setloading2(true)
    try {
      const res = await fetch(`https://cerbookingonline.onrender.com/admin/update`,{
        method : "POST",
        credentials : 'include',
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({id : idInactive})
      })

      const data = await res.json()
      if(data.success){
        setidInactive("")
        setloading2(false)
        alert("Update Inactive")
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-700 text-center">
          Admin Dashboard
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Monitor and manage your platform’s key metrics.
        </p>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Summary Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardSummaryCard
            title="Total Users"
            count={totalUsers}
            onClick={() => navigate("/all-users")}
            icon="👥"
          />
          <DashboardSummaryCard
            title="Total Captains"
            count={totalCaptains}
            onClick={() => navigate("/all-captains")}
            icon="🚖"
          />
          <DashboardSummaryCard
            title="Total Rides"
            count={totalRides}
            onClick={() => navigate("/all-rides")}
            icon="🛣️"
          />
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Overview</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div className="border flex justify-center items-center my-4 py-4 bg-white shadow-xl rounded-xl">
        <form onSubmit={hendelsubmit} className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-lg sm:text-xl font-semibold px-2 py-4">Update to admin enter Id number here and type</h1>
          <input
            type="text"
            name="id"
            value={id}
            onChange={(e) => setid(e.target.value)}
            placeholder="enter id number"
            className="w-72 sm:w-96 p-2 rounded-md border"
          />
          <select
            name="type"
            value={type}
            onChange={(e) => settype(e.target.value)}
            className="w-72 sm:w-96 p-2 rounded-md border"
          >
            <option value="">Select type</option>
            <option value="user">User</option>
            <option value="captain">Captain</option>
          </select>
          <button className="w-72 sm:w-96 p-2 bg-black text-white rounded-md flex justify-center items-center">{loading ? <Spinner/> : "Submit"}</button>
        </form>
      </div>
      <div className="border flex justify-center items-center my-4 py-4 bg-white shadow-xl rounded-xl">
        <form onSubmit={hendelinactive} className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-lg sm:text-xl font-semibold px-2 py-4">Update captain inactive</h1>
          <input
            type="text"
            name="idInactive"
            value={idInactive}
            onChange={(e) => setidInactive(e.target.value)}
            placeholder="enter id number"
            className="w-72 sm:w-96 p-2 rounded-md border"
          />
          <button className="w-72 sm:w-96 p-2 bg-black text-white rounded-md flex justify-center items-center">{loading2 ? <Spinner/> : "Submit"}</button>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard;
