import React, { useContext, useEffect } from 'react';
import { captainContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';

function CompletRide() {
  const { ride, url, setcomplet, setshowOtppage, setshowCaptain, setshowRequest } = useContext(captainContext);

  const handleComplete = async (e) => {
    e.preventDefault();

    const isPaymentDone = window.confirm(
      '⚠️ Have you received the payment for this ride? Click "OK" if payment is done, or "Cancel" if not.'
    );

    if (!isPaymentDone) {
      alert('Please ensure payment is received before completing the ride.');
      return;
    }

    try {
      const res = await fetch(`${url}/ride/complete`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rideId: localStorage.getItem("rideId") }),
      });

      const data = await res.json();

      if (data.success) {
        alert('🎉 Ride completed successfully!');
        localStorage.removeItem("completeToken")
        localStorage.removeItem("rideId")
        localStorage.removeItem("Capride")
        setcomplet(false)
        setshowCaptain(true)
      } else {
        alert('⚠️ Failed to complete the ride. Please try again!');
      }
    } catch (error) {
      console.error('Error completing the ride:', error);
    }
  };

  useEffect(()=>{
    const token = Math.random();
    localStorage.setItem("completeToken", token);
    setcomplet(true)
    setshowOtppage(false)
    setshowCaptain(localStorage.getItem("size") <=640 ? false :  true)
    setshowRequest(false)
  })
  return (
    <div className="border border-gray-300 rounded-xl shadow-lg mt-5 items-center cursor-pointer flex flex-col gap-4 sm:gap-6">
      <div className="bg-white w-full max-w-md p-4">
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-800 text-center mb-3">
          🚗 Ride Details
        </h2>

        {/* Ride Details */}
        <div className="text-gray-700 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-blue-600">Pickup:</span>
            <span>{ride?.startLocation || 'N/A'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-green-600">Drop:</span>
            <span>{ride?.endLocation || 'N/A'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-yellow-600">Fare:</span>
            <span>{ride?.fare ? `₹ ${ride?.fare}` : 'N/A'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-pink-600">Distance:</span>
            <span>{ride?.distance ? `${ride.distance}` : 'N/A'}</span>
          </div>
        </div>

        {/* Important Payment Note */}
        <p className="text-xs text-red-600 font-semibold text-center mb-3">
          Important: Ensure payment is received before clicking the button below.
        </p>

        {/* Complete Button */}
        <button
          onClick={handleComplete}
          className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white py-2 px-4 rounded-md font-medium text-sm w-full shadow-md transition-transform transform hover:scale-105"
        >
          Complete Ride
        </button>
      </div>
    </div>
  );
}

export default CompletRide;
