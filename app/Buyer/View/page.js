// `app/page.tsx` is the UI for the `/` URL
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BuyerCard from '../../../components/Buyer/Buyercard'
import TaskBar from '../../../components/Home/Taskbar';
import { useRouter } from 'next/navigation'

function BuyersView() {
  const [buyers, setBuyers] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3021/api/buyer/getBuyersInfo?page=${page}&limit=10`); // Change the URL to your server endpoint
      setBuyers(response.data.docs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <TaskBar />
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold mb-4">Buyers Data</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {buyers.map((buyer) => (
            <BuyerCard key={buyer._id} buyer={buyer} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((prevPage) => prevPage > 1 ? prevPage - 1 : prevPage)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded"
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={buyers.length < 10} // Assuming 10 items per page
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyersView;
