import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft, FaUtensils, FaHashtag, FaCalendarAlt, FaConciergeBell ,FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DonateSingleMeal = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        mealDescription: '',
        quantity: '',
        schedulePickUp: ''
    });

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/v1/users/addMeal', formData, {
                credentials: true
            });
            toast.success('Meal donated successfully!');
            closeModal();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to donate meal. Please try again later.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div 
                className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-lg max-h-[90vh] overflow-y-auto relative"
                data-aos="flip-up"
            >
                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                >
                   <FaTimes className="text-2xl" />
                </button>

                {/* Title with Bounce Animation */}
                <div className="text-center space-y-2">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <FaConciergeBell className="text-5xl text-green-600 mx-auto" />
                    </motion.div>
                    <h1 className="text-2xl font-bold">Donate a Meal</h1>
                </div>

                {/* Form */}
                <div className="space-y-4 mt-4">
                    {/* Meal Description */}
                    <div>
                        <label className="block font-semibold">Meal Description:</label>
                        <div className="flex items-center border border-gray-300 rounded-md p-2">
                            <FaUtensils className="text-gray-500 text-lg mr-2" />
                            <input
                                type="text"
                                name="mealDescription"
                                value={formData.mealDescription}
                                onChange={handleChange}
                                required
                                className="w-full outline-none border-none bg-transparent"
                                placeholder="Enter meal description"
                            />
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block font-semibold">Quantity:</label>
                        <div className="flex items-center border border-gray-300 rounded-md p-2">
                            <FaHashtag className="text-gray-500 text-lg mr-2" />
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                                className="w-full outline-none border-none bg-transparent"
                                placeholder="Enter quantity"
                            />
                        </div>
                    </div>

                    {/* Schedule Pick Up */}
                    <div>
                        <label className="block font-semibold">Schedule Pick Up:</label>
                        <div className="flex items-center border border-gray-300 rounded-md p-2">
                            <FaCalendarAlt className="text-gray-500 text-lg mr-2" />
                            <input
                                type="datetime-local"
                                name="schedulePickUp"
                                value={formData.schedulePickUp}
                                onChange={handleChange}
                                required
                                className="w-full outline-none border-none bg-transparent"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full p-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition flex justify-center items-center"
                    >
                        Donate Meal <FaConciergeBell className="ml-2" />
                    </button>
                </div>

                <ToastContainer />
            </div>
        </div>
    );
};

export default DonateSingleMeal;
