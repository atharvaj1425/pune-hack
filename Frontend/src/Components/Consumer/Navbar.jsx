import React, { useEffect, useState } from 'react';
import { FaHotel } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import DeliveredDonations from './DeliveredDonations';
import ActiveDonation from './ActiveDonation';
import DonationHistory from './DonationHistory';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [showDeliveredDonations, setShowDeliveredDonations] = useState(false);
  const [showActiveDonation, setShowActiveDonation] = useState(false);
  const [showDonationHistory, setShowDonationHistory] = useState(false);

  useEffect(() => {
    // Retrieve email from localStorage when the component is mounted
    const email = localStorage.getItem("userEmail");
    const username = localStorage.getItem("userName");
  
    if (email) {
      setUserEmail(email); 
    }
    if (username) {
      setUserName(username); 
    }
  }, []);

  const handleShowDeliveredDonations = () => {
    setShowDeliveredDonations(true);
  };

  const handleCloseDeliveredDonations = () => {
    setShowDeliveredDonations(false);
  };

  const handleShowActiveDonation = () => {
    setShowActiveDonation(true);
  };

  const handleCloseActiveDonation = () => {
    setShowActiveDonation(false);
  };

  const handleShowDonationHistory = () => {
    setShowDonationHistory(true);
  };

  const handleCloseDonationHistory = () => {
    setShowDonationHistory(false);
  };

  return (
    <div className="flex bg-white p-4 rounded-lg border-2 border-black shadow-lg mt-15 w-full justify-between">
      <div className="flex items-center">
        {/* Restaurant Image beside Retailer Dashboard */}
        <img src="/consumer.png" alt="Restaurant" className="w-16 h-16 mr-2" />
        <div className="text-4xl font-semibold">User Dashboard</div>
      </div>

      {/* Links in the center */}
      <div className="flex items-center space-x-8">
        <div className="text-lg font-bold text-green-800 pb-1 border-b-4 border-green-800">
          Overview
        </div>
        <div className="text-lg font-bold text-black hover:text-green-800 pb-1 border-b-4 border-transparent hover:border-green-800 cursor-pointer" onClick={handleShowDonationHistory}>
          Donation History
        </div>
        <div className="text-lg font-bold text-black hover:text-green-800 pb-1 border-b-4 border-transparent hover:border-green-800 cursor-pointer" onClick={handleShowActiveDonation}>
          Current Donation
        </div>
        <Link to="/single-meal-status" className="text-lg font-bold text-black hover:text-green-800 pb-1 border-b-4 border-transparent hover:border-green-800">
          Single Meal Status
        </Link>
        {/* <div className="text-lg font-bold text-black hover:text-green-800 pb-1 border-b-4 border-transparent hover:border-green-800 cursor-pointer" onClick={handleShowDeliveredDonations}>
          Delivered Donations
        </div> */}
      </div>

      {/* User Icon with Username beside it on the right side */}
      <div className="flex items-center">
        {/* Login Image beside APMC */}
        <img src="/login.png" alt="Login" className="w-12 h-12 mr-2" />
        <div className="text-lg font-bold">{userName ? userName : "Guest"}</div>
      </div>

      {showDeliveredDonations && <DeliveredDonations onClose={handleCloseDeliveredDonations} />}
      {showActiveDonation && <ActiveDonation onClose={handleCloseActiveDonation} />}
      {showDonationHistory && <DonationHistory onClose={handleCloseDonationHistory} />}
    </div>
  );
}

export default NavBar;