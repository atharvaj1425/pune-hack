import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaQuoteLeft, FaQuoteRight, FaAppleAlt } from "react-icons/fa";
import { MdRectangle } from "react-icons/md";
import { motion } from "framer-motion"; // Import Framer Motion
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const Form = ({ closeModal, updateFoodItems }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    expiryDate: "",
    schedulePickUp: "",
    foodType: "",
  });

  useEffect(() => {
    // Initialize AOS animations
    AOS.init();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    const formattedData = {
      ...formData,
      expiryDate: formatDate(formData.expiryDate),
      schedulePickUp: formatDate(formData.schedulePickUp),
    };

    console.log("Formatted Data:", formattedData);

    try {
      const response = await axios.post(
        "/api/v1/restaurants/donateFood",
        formattedData,
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Donation submitted successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        console.log("Server Response:", response.data);
        setFormData({
          foodName: "",
          quantity: "",
          expiryDate: "",
          schedulePickUp: "",
          foodType: "",
        });
        updateFoodItems(response.data); // Update the food items in the parent component
        closeModal(); // Close the modal on successful submission
      } else {
        toast.error("Failed to submit donation. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
      }
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto" data-aos="fade-up">
      <ToastContainer />
      {/* Back Button with Animated Hover Effect */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={closeModal}
          className="p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 focus:outline-none transform hover:scale-110 transition-transform"
        >
          <FaArrowLeft className="text-xl" />
        </button>
      </div>

      {/* Title with Animation */}
      <div className="flex items-center justify-center mb-6" data-aos="flip-up" data-aos-delay="200">
        <FaQuoteLeft className="text-3xl text-green-600" />
        <h2 className="text-3xl font-bold text-gray-800 mx-3">Food Donation Form</h2>
        <FaQuoteRight className="text-3xl text-green-600" />
      </div>

      {/* Inspirational Quote Below Header */}
      <motion.div
        className="text-center text-lg font-semibold text-gray-600 mb-6"
        data-aos="bounce-in"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <p>"One meal can make a difference. Together, we make hunger history!"</p>
      </motion.div>

      {/* Form Fields with Animations */}
      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <div data-aos="flip-up">
          <div className="flex items-center mb-2">
            <FaAppleAlt className="text-green-500 mr-2" />
            <label className="font-semibold">Food Name</label>
          </div>
          <div className="flex items-center border p-3 rounded-lg">
            <input
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              placeholder="Food Name"
              className="w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>
        </div>

        <div data-aos="flip-up" data-aos-delay="100">
          <div className="flex items-center mb-2">
            <MdRectangle className="text-green-500 mr-2" />
            <label className="font-semibold">Quantity</label>
          </div>
          <div className="flex items-center border p-3 rounded-lg">
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g., 10 kg"
              className="w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>
        </div>

        <div data-aos="flip-up" data-aos-delay="200">
          <div className="flex items-center mb-2">
            <FaQuoteLeft className="text-green-500 mr-2" />
            <label className="font-semibold">Expiry Date</label>
          </div>
          <div className="flex items-center border p-3 rounded-lg">
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>
        </div>

        <div data-aos="flip-up" data-aos-delay="300">
          <div className="flex items-center mb-2">
            <FaQuoteLeft className="text-green-500 mr-2" />
            <label className="font-semibold">Schedule Pick-Up</label>
          </div>
          <div className="flex items-center border p-3 rounded-lg">
            <input
              type="date"
              name="schedulePickUp"
              value={formData.schedulePickUp}
              onChange={handleChange}
              className="w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>
        </div>

        <div data-aos="flip-up" data-aos-delay="400">
          <div className="flex items-center mb-2">
            <MdRectangle className="text-green-500 mr-2" />
            <label className="font-semibold">Food Type</label>
          </div>
          <div className="flex items-center border p-3 rounded-lg">
            <input
              type="text"
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              placeholder="e.g., Fruits, Grains"
              className="w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>
        </div>
      </form>

      {/* Action Buttons with Animated Hover Effect */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-white hover:text-green-900 border-2 border-green-600 transition-transform transform hover:scale-110"
        >
          Donate <MdRectangle className="inline-block ml-2" />
        </button>
        <button
          onClick={closeModal}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-white hover:text-blue-900 border-2 border-blue-600 transition-transform transform hover:scale-110"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Form;
