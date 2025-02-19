import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActiveDonation = ({ onClose }) => {
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveDonation = async () => {
      try {
        const response = await axios.get('/api/v1/users/active-donation', {
          withCredentials: true,
        });
        setDonation(response.data.data);
      } catch (err) {
        console.error('Error fetching active donation:', err);
        setError('Failed to load active donation');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveDonation();
  }, []);

  if (loading) return <div>Loading active donation...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Active Donation</h2>
          <button onClick={onClose} className="text-red-500 font-bold">Close</button>
        </div>
        {donation ? (
          <table className="min-w-full bg-white border border-gray-300 border-collapse">
            <thead>
              <tr className="hover:bg-gray-100">
                <th className="py-2 px-4 border-b">Meal Description</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Pick-up Date</th>
                <th className="py-2 px-4 border-b">Pincode</th>
                <th className="py-2 px-4 border-b">Accepted By</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{donation.mealDescription}</td>
                <td className="py-2 px-4 border-b">{donation.quantity}</td>
                <td className="py-2 px-4 border-b">{new Date(donation.schedulePickUp).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{donation.pincode}</td>
                <td className="py-2 px-4 border-b">{donation.accepetedBy}</td>
                <td className="py-2 px-4 border-b">{donation.status}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div>No active donation found</div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ActiveDonation;