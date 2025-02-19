import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { FaHotel } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa"; // Import logout icon

const NavBar = () => {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate(); // React Router navigation hook

  useEffect(() => {
    // Retrieve email from localStorage when the component is mounted
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email); 
    }
  }, []);

  const handleLogout = () => {
    // Clear access token and user email from localStorage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("accessToken");

    // Redirect to Homepage
    navigate('/');
  };

  return (
    <div className="flex bg-white p-4 rounded-lg border-2 border-black shadow-lg mt-15 w-full justify-between">
      <div className="flex items-center">
        {/* NGO Logo beside Dashboard Title */}
        <img src="/building.png" alt="NGO" className="w-16 h-16 mr-2" />
        <div className="text-4xl font-semibold">NGO Dashboard</div>
      </div>

      {/* Links in the center */}
      <div className="flex items-center space-x-8">
        <div className="text-lg font-bold text-green-800 pb-1 border-b-4 border-green-800">
          Overview
        </div>
        <div className="text-lg font-bold text-black hover:text-green-800 pb-1 border-b-4 border-transparent hover:border-green-800">
          All Data
        </div>
        <Link to="/current-donation">
          <div className="text-lg font-bold text-black hover:text-green-800 pb-1 border-b-4 border-transparent hover:border-green-800">
            Current Donation
          </div>
        </Link>
        <div className="text-lg font-bold text-black hover:text-green-800 pb-1 border-b-4 border-transparent hover:border-green-800">
          Network
        </div>
      </div>

      {/* User Icon with Username and Logout button */}
      <div className="flex items-center">
        <img src="/login.png" alt="Login" className="w-12 h-12 mr-2" />
        <div className="text-lg font-bold mr-4">{userEmail ? userEmail : "Guest"}</div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
        >
          Logout <FaSignOutAlt className="ml-2" /> {/* Added space between icon and text */}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
