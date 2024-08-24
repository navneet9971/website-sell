import React, { useEffect, useState } from 'react';
import axiosInstance from '../../interceptor/axiosInstance';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const BuyCodePage = () => {
  // const location = useLocation();
  // const { userId } = location.state || {};

  const userId = Cookies.get("userId")

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    console.log("Fetching data for userId:", userId); // Debugging line

    if (userId) {
      axiosInstance(`/api/user-purchases/${userId}`)
        .then((res) => {
          console.log('Purchases data:', res.data); // Debugging line
          setPurchases(res.data);
        })
        .catch((err) => {
          toast.error('Failed to fetch purchase data');
          console.error('Error fetching user purchases:', err.response ? err.response.data : err.message);
        });
    }
  }, [userId]);

  return (
    <div>
      <h1>User Purchases</h1>
      <ul>
        {purchases.length > 0 ? (
          purchases.map((purchase) => (
            <li key={purchase._id}>
              {purchase.title} - {purchase.price} - {purchase.purchaseDate}
            </li>
          ))
        ) : (
          <p>No purchases found.</p>
        )}
      </ul>
    </div>
  );
};

export default BuyCodePage;
