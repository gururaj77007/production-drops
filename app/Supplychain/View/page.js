"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SupplyChainCard from '../../../components/Supplychain/SupplyChainCard';
import TaskBar from '../../../components/Home/Taskbar';
import { useRouter } from 'next/navigation'


function SupplyChainView() {
  const [supplyChainData, setSupplyChainData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3021/api/supplychain?page=${page}&limit=10`);
      console.log(response.data.docs)
      setSupplyChainData(response.data.docs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
         <TaskBar></TaskBar>
        <div className="container mx-auto px-4 mt-8">
       
      <h1 className="text-3xl font-bold mb-4">Supply Chain Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {supplyChainData.map((data) => (
          <SupplyChainCard key={data._id} data={data} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setPage((prevPage) => prevPage > 1 ? prevPage - 1 : prevPage)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
    </div>
    
  );
}

export default SupplyChainView;
