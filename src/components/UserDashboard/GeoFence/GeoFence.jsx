import React, { useState } from 'react';
import './GeoFence.css'; // Import the new CSS file

const GeoFence = ({ onSetBoundary }) => {
  const [radius, setRadius] = useState('');
  const [error, setError] = useState('');

  const handleSetBoundary = () => {
    if (radius > 0) {
      onSetBoundary(radius);
      setError(''); // Clear any previous error
    } else {
      setError('Please enter a valid radius greater than 0.');
    }
  };

  return (
    <div className="geo-fence-container">
      <h3 className="geo-fence-title">Set Geo-Fence Boundary</h3>
      <div className="geo-fence-input-wrapper">
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          placeholder="Enter boundary radius in meters"
          className="geo-fence-input"
          min="1"
        />
        <button onClick={handleSetBoundary} className="geo-fence-button">
          Set Boundary
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default GeoFence;
