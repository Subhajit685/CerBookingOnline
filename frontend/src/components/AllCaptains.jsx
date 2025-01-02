import React, { useEffect, useState } from "react";

function AllCaptains() {
  const [captains, setCaptains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCaptains = async () => {
    try {
      const res = await fetch(`http://localhost:4000/admin/allcaptain`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        setCaptains(data.captains);
      } else {
        throw new Error("Failed to fetch captains");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaptains();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        All Captains
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">
          <p>Failed to load captains: {error}</p>
        </div>
      ) : captains.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No captains found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {captains.map((captain, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="bg-blue-500 text-white p-4">
                <h2 className="text-xl font-semibold">{captain.fullname}</h2>
                <p className="text-sm">License: {captain.licence || "N/A"}</p>
              </div>
              <div className="p-4">
                <p className="text-gray-700">
                  <strong>Vehicle Type:</strong> {captain.vehicle.vehicleType || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Number Plate:</strong> {captain.vehicle.numberPalte || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {captain.email}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {captain.gender || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllCaptains;
