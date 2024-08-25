import React, { useEffect, useState } from 'react';
import axiosInstance from '../../interceptor/axiosInstance';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const BuyCodePage = () => {
  const userId = Cookies.get("userId");

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    console.log("Fetching data for userId:", userId); // Debugging line

    if (userId) {
      axiosInstance(`/api/user-purchases/${userId}`)
        .then((res) => {
          setPurchases(res.data);
          const purchasesString = JSON.stringify(res.data);
          Cookies.set('purchases', purchasesString);
        })
        .catch((err) => {
          toast.error('Failed to fetch purchase data');
          console.error('Error fetching user purchases:', err.response ? err.response.data : err.message);
        });
    }
  }, [userId]);

  console.log(purchases);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Your Purchases</h1>
      {purchases.length > 0 ? (
        purchases.map((purchase) => (
          <div key={purchase._id} className="mb-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Purchase Details</h2>
            
            {/* Render for purchases with multiple product IDs */}
            {purchase.productIds && purchase.productIds.length > 0 ? (
              <div>
                <h3 className="text-xl font-semibold mb-3">Titles:</h3>
                <ul className="list-disc pl-5 mb-4">
                  {purchase.title.map((t, index) => (
                    <li key={index} className="text-gray-700">{t}</li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-semibold mb-3">Images:</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  {purchase.img.map((imgUrl, index) => (
                    <div key={index} className="w-32 h-32 overflow-hidden rounded-lg shadow-md">
                      <img src={imgUrl} className="object-cover w-full h-full" alt={`Purchase ${index}`} />
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">Product Links:</h3>
                <ul className="space-y-2">
                  {purchase.products.map((product, index) => (
                    <li key={index} className="flex flex-col space-y-2">
                      <a href={product.installationGuide} className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Installation Guide</a>
                      <a href={product.livePreview} className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Live Preview</a>
                      <a href={product.projectCode} className="inline-block px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">Project Code</a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              /* Render for purchases with a single product ID */
              <div>
                <h3 className="text-xl font-semibold mb-3">Title:</h3>
                <p className="text-gray-700 mb-4">{purchase.title[0]}</p>
                
                <h3 className="text-xl font-semibold mb-3">Image:</h3>
                <div className="w-32 h-32 overflow-hidden rounded-lg shadow-md mb-4">
                  <img src={purchase.img[0]} className="object-cover w-full h-full" alt="Purchase" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">Product Links:</h3>
                <a href={purchase.products[0].installationGuide} className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition mb-2 block">Installation Guide</a>
                <a href={purchase.products[0].livePreview} className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition mb-2 block">Live Preview</a>
                <a href={purchase.products[0].projectCode} className="inline-block px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">Project Code</a>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No purchases found.</p>
      )}
    </div>
  );
};

export default BuyCodePage;
