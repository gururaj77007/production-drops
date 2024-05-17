// components/BuyerCard.js
import React from 'react';

const BuyerCard = ({ buyer }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-xl font-semibold">{buyer.companyName}</h2>
      <p>{buyer.country}</p>
      <ul>
        {buyer.products.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>
      <p>{buyer.contactInformation[0].type}: {buyer.contactInformation[0].value}</p>
    </div>
  );
};

export default BuyerCard;
