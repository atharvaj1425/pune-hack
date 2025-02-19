import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa"; // Removed FaBell since we're using a dot now
import { useNavigate } from "react-router-dom";

import ActiveDonation from "./ActiveDonation";
import DonationHistory from "./DonationHistory";
import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [showActiveDonation, setShowActiveDonation] = useState(false);
  const [showDonationHistory, setShowDonationHistory] = useState(false);
  const [activeDonationExists, setActiveDonationExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const username = localStorage.getItem("userName");
    if (email) setUserEmail(email);
    if (username) setUserName(username);

    // Fetch if there's an active donation
    const checkActiveDonation = async () => {
      try {
        const response = await axios.get("/api/v1/users/active-donation", {
          withCredentials: true,
        });
        setActiveDonationExists(response.data.data ? true : false);
      } catch (err) {
        console.error("Error fetching active donation:", err);
      }
    };

    checkActiveDonation();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("accessToken");
    navigate("/", { replace: true });
  };

  return (
    <div className="flex bg-white p-4 rounded-lg border-2 border-black shadow-lg mt-4 w-full justify-between">
      {/* Left Side */}
      <div className="flex items-center">
        <img src="/consumer.png" alt="Restaurant" className="w-16 h-16 mr-2" />
        <div className="text-4xl font-semibold">User Dashboard</div>
      </div>

      {/* Center Navigation */}
      <div className="flex items-center space-x-8">
        <div className="text-lg font-bold text-green-800 pb-1 border-b-4 border-green-800">
          Overview
        </div>
        <div
          className="text-lg font-bold text-black hover:text-green-800 pb-1 border-b-4 border-transparent hover:border-green-800 cursor-pointer"
          onClick={() => setShowDonationHistory(true)}
        >
          Donation History
        </div>
        <div
          className="relative text-lg font-bold text-black hover:text-green-800 pb-1 border-b-4 border-transparent hover:border-green-800 cursor-pointer"
          onClick={() => setShowActiveDonation(true)}
        >
          Current Donation
          {/* Small Red Notification Dot */}
          {activeDonationExists && (
            <span className="absolute top-2 left-28 mt-0.5 ml-7 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          )}
        </div>
        <Link
          to="/single-meal-status"
          className="text-lg font-bold text-black hover:text-green-800 pb-1 border-b-4 border-transparent hover:border-green-800"
        >
          Single Meal Status
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center">
        <img src="/login.png" alt="Login" className="w-12 h-12 mr-2" />
        <div className="text-lg font-bold mr-4">{userName || "Guest"}</div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
        >
          Logout <FaSignOutAlt className="ml-2" />
        </button>
      </div>

      {/* Popups for Active Donation & History */}
      {showActiveDonation && <ActiveDonation onClose={() => setShowActiveDonation(false)} />}
      {showDonationHistory && <DonationHistory onClose={() => setShowDonationHistory(false)} />}
    </div>
  );
};

export default NavBar;
