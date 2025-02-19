import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeliveredDonations = ({ onClose }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('/api/v1/users/donation-history', {
          params: { status: 'Delivered' },
          withCredentials: true,
        });
        setDonations(response.data.data);
      } catch (err) {
        console.error('Error fetching donations:', err);
        setError('Failed to load donations');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <div>Loading donations...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Delivered Donations</h2>
          <button onClick={onClose} className="text-red-500 font-bold">Close</button>
        </div>
        <table className="min-w-full bg-white border border-gray-300 border-collapse">
          <thead>
            <tr className="hover:bg-gray-100">
              <th className="py-2 px-4 border-b">Meal Description</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Pick-up Date</th>
              <th className="py-2 px-4 border-b">Pincode</th>
              <th className="py-2 px-4 border-b">Accepted By</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{donation.mealDescription}</td>
                <td className="py-2 px-4 border-b">{donation.quantity}</td>
                <td className="py-2 px-4 border-b">{new Date(donation.schedulePickUp).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{donation.pincode}</td>
                <td className="py-2 px-4 border-b">{donation.acceptedBy ? donation.acceptedBy.name : 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </div>
  );
};

export default DeliveredDonations;