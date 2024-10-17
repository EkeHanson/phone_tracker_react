import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate
import 'leaflet/dist/leaflet.css';
import './TrackingMap.css'; // Import CSS for styling

const TrackingMap = ({ deviceLocation }) => {
  const [mapType, setMapType] = useState('satellite'); // Default view
  const navigate = useNavigate(); // Updated to useNavigate

  // Function to toggle between map views
  const toggleMapType = (type) => setMapType(type);

  // Function to navigate back to user dashboard
  const goToDashboard = () => navigate('/users-dashboard'); // Updated to useNavigate

  // Define the TileLayer URL based on the selected map type
  const getTileLayerUrl = () => {
    switch (mapType) {
      case 'satellite':
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // Placeholder URL for satellite view
      case 'gps':
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // Placeholder URL for GPS view
      case 'hybrid':
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // Placeholder URL for hybrid view
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // Fallback
    }
  };

  return (
    <div className="centered-container">
      <div className="tracking-map-container">
        <button className="back-button" onClick={goToDashboard}>
          Back to Dashboard
        </button>
        <div className="map-controls">
          <button onClick={() => toggleMapType('gps')} className="map-button">GPS View</button>
          <button onClick={() => toggleMapType('satellite')} className="map-button">Satellite View</button>
          <button onClick={() => toggleMapType('hybrid')} className="map-button">Hybrid View</button>
        </div>
        <MapContainer center={deviceLocation} zoom={13} className="map">
          <TileLayer url={getTileLayerUrl()} />
          <Marker position={deviceLocation}>
            <Popup>Device Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default TrackingMap;
