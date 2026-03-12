import React from "react";
import { Link } from "react-router-dom";

function StatsCard({ title, value, icon: Icon, color,path }) {
  return (
    <Link to={path} className="bg-base-100 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-between">
      {/* Left Content */}
      <div>
        <p className="text-sm opacity-60">{title}</p>
        <h2 className="text-2xl md:text-3xl font-bold mt-1">{value}</h2>
      </div>

      {/* Right Icon */}
      <div className={`p-3 rounded-xl text-white ${color}`}>
        <Icon size={24} />
      </div>
    </Link>
  );
}

export default StatsCard;
