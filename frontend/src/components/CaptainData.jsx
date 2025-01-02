import React, { useContext } from 'react';
import { captainContext } from '../context/CaptainContext';

function CaptainData() {
  const { captain } = useContext(captainContext);

  return (
    <div className="px-4 py-4 rounded-lg mt-4 bg-gradient-to-r transition-all">
      {/* Captain Info Header */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={captain?.ProfileImage || '/user.png'} // Default image fallback
          alt="Captain Avatar"
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
        />
        <div className="text-sm font-semibold text-gray-800">
          <p>{captain?.fullname || 'John Doe'}</p>
          <p className="text-xs text-gray-500">{captain?._id || 'License Number: AB123456'}</p>
        </div>
      </div>

      {/* Captain Vehicle Info */}
      <div className="bg-white p-3 rounded-md shadow-sm divide-y divide-gray-200 text-sm">
        <div className="flex justify-between py-1">
          <span className="font-medium text-gray-700">Vehicle Model:</span>
          <span className="text-gray-600">{captain?.vehicle?.model || 'Toyota Prius'}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="font-medium text-gray-700">Vehicle Type:</span>
          <span className="text-gray-600">{captain?.vehicle?.vehicleType || 'Sedan'}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="font-medium text-gray-700">Vehicle Number:</span>
          <span className="text-gray-600">{captain?.vehicle?.numberPalte}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="font-medium text-gray-700">Vehicle Color:</span>
          <span className="text-gray-600">{captain?.vehicle?.color || 'White'}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="font-medium text-gray-700">Vehicle Color:</span>
          <span className="text-gray-600">{captain?.status}</span>
        </div>
      </div>
    </div>
  );
}

export default CaptainData;
