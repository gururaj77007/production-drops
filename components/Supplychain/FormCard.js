// components/CardFlip.js
// components/CardFlip.js
'use client'
// components/CardFlip.js
import { useState } from 'react';
import "../../app/styles/CardFlip.css"

const CardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-64 h-80 relative" onClick={handleFlip}>
      <div className="absolute w-full h-full transform perspective-1000">
        <div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
          <div className="front">
            <h2 className="text-xl font-semibold mb-4">Front Side</h2>
            <p>Click to flip</p>
          </div>
          <div className="back">
            <h2 className="text-xl font-semibold mb-4">Back Side</h2>
            <p>Click to flip back</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFlip;
