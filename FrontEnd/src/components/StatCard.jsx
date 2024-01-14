import React from "react";

function StatCard({ statTitle, statValue }) {
  return (
    <div className="bg-coral-red w-1/4 flex flex-col justify-center items-center py-4 rounded-xl">
      {/* Add your stat card content here */}
      <p className="text-white text-lg">{statTitle}</p>
      <p className="text-white text-2xl">{statValue}</p>
    </div>
  );
}

export default StatCard;
