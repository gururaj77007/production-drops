// components/SupplyChainCard.js
"use client"
import React from 'react';
import { useRouter } from 'next/navigation'


function SupplyChainCard({ data }) {
    const router = useRouter()
    
  return (
    <div className="bg-white rounded-lg shadow-md p-4" onClick={() => router.push(`/Supplychain/Detail/${data._id}`)}> 
      <img src={data.photosURL[0]||null} alt={data.beneficiaryName} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{data.beneficiaryName}</h2>
        <p className="text-gray-600 mb-2">Age: {data.age}</p>
        <p className="text-gray-600 mb-2">Address: {data.address}</p>
        <p className="text-gray-600 mb-2">District: {data.district}</p>
        <p className="text-gray-600 mb-2">Taluk: {data.taluk}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
}

export default SupplyChainCard;
