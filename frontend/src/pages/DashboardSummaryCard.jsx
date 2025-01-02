// src/components/DashboardSummaryCard.js
import React from "react";

function DashboardSummaryCard({ title, count, onClick, icon }) {
  return (
    <div
      className={`flex items-center justify-between bg-gradient-to-r text-black p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer`}
      onClick={onClick}
    >
      <div className="text-5xl">{icon}</div>
      <div className="text-right">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{count}</p>
      </div>
    </div>
  );
}

export default DashboardSummaryCard;
