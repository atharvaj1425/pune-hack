import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft } from 'react-icons/fa';

const DonateSingleMeal = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        mealDescription: '',
        quantity: '',
        schedulePickUp: ''
    });
    const [meals, setMeals] = useState([]);

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
            const response = await axios.post('/api/v1/users/addMeal', formData, {
            credentials: true
            });
            setMeals((prevMeals) => [...prevMeals, response.data.data]);
            setFormData({
                mealDescription: '',
                quantity: '',
                schedulePickUp: ''
            });
            toast.success('Meal donated successfully!');
            closeModal(); // Close the modal on successful submission
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to donate meal. Please try again later.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl space-y-6">
            {/* Close Button */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={closeModal}
                    className="p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 focus:outline-none"
                >
                    <FaArrowLeft className="text-xl" />
                </button>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-center text-gray-800">Donate a Single Meal</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="mealDescription" className="block text-gray-700 font-medium mb-2">Meal Description:</label>
                    <input
                        type="text"
                        id="mealDescription"
                        name="mealDescription"
                        value={formData.mealDescription}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">Quantity:</label>
                    <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="schedulePickUp" className="block text-gray-700 font-medium mb-2">Schedule Pick Up:</label>
                    <input
                        type="datetime-local"
                        id="schedulePickUp"
                        name="schedulePickUp"
                        value={formData.schedulePickUp}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 flex justify-center items-center text-xl"
                >
                    Donate
                </button>
            </form>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default DonateSingleMeal;