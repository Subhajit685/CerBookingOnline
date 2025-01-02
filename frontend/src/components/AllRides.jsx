import React, { useEffect, useState } from "react";

function AllRides() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRides = async () => {
    try {
      const res = await fetch(`http://localhost:4000/admin/allride`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        setRides(data.rides);
      } else {
        throw new Error("Failed to fetch rides");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        All Rides
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">
          <p>Failed to load rides: {error}</p>
        </div>
      ) : rides.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No rides found.</p>
        </div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">User ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Captain ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">From</th>
              <th className="border border-gray-300 px-4 py-2 text-left">To</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Distance</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Created At</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride, index) => (
              <tr
                key={index}
                className={`${
                  ride.status === "cancelled" ? "bg-red-500 text-white" : "bg-white"
                }`}
              >
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{ride.user}</td>
                <td className="border border-gray-300 px-4 py-2">{ride.caption}</td>
                <td className="border border-gray-300 px-4 py-2">{ride.startLocation}</td>
                <td className="border border-gray-300 px-4 py-2">{ride.endLocation}</td>
                <td className="border border-gray-300 px-4 py-2">{ride.distance} km</td>
                <td className="border border-gray-300 px-4 py-2">₹ {ride.fare}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(ride.createdAt)}
                </td>
                <td className="border border-gray-300 px-4 py-2">{ride.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllRides;
