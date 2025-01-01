import React from 'react';
import './DeviceInfo.css'; // Import the CSS file

const DeviceInfo = ({ device }) => {

  // Function to format the date
  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A"; // Handle case where the date is not available
    const date = new Date(isoDate);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

       console.log("device data")
        console.log(device)
        console.log("device data")

  return (
    <div className="device-info">
      <h3 className="device-title">Device Information</h3>
      <div className="device-grid">
        <div className="device-item">
          <strong>Name:</strong> {device?.device_name || "N/A"}
        </div>
        <div className="device-item">
          <strong>Browser:</strong> {device?.browser || "N/A"}
        </div>
        <div className="device-item">
          <strong>Device Type:</strong> {device?.device_type || "N/A"}
        </div>

        <div className="device-item">
          <strong>Ip Address:</strong> {device?.ip_address || "N/A"}
        </div>

        <div className="device-item">
          <strong>Street:</strong> {device?.street || "N/A"}, {device?.buildingNumber || "N/A"}
        </div>
        
        <div className="device-item">
          <strong>City:</strong> {device?.city || "N/A"}
        </div>
        {/* <div className="device-item">
          <strong>State:</strong> {device?.state || "N/A"}
        </div> */}
        <div className="device-item">
          <strong>Postal Code:</strong> {device?.postal_code || "N/A"}
        </div>
        <div className="device-item">
          <strong>Latitude:</strong> {device?.geolocation?.lat ||  "N/A"}
        </div>
        <div className="device-item">
          <strong>Longitude:</strong> {device?.geolocation?.lon || "N/A"}
        </div>
        <div className="device-item">
          <strong>Nearby Landmark:</strong> {device?.nearby_landmark || "N/A"}
        </div>
        {/* <div className="device-item">
          <strong>Location Accuracy:</strong> {device?.location_accuracy || "N/A"}
        </div> */}
        <div className="device-item">
          <strong>Altitude:</strong> {device?.altitude || "N/A"}
        </div>
        <div className="device-item">
          <strong>Speed:</strong> {device?.speed || "N/A"}
        </div>
        <div className="device-item">
          <strong>Direction:</strong> {device?.direction || "N/A"}
        </div>
        <div className="device-item">
          <strong>Battery Level:</strong> {device?.battery_level != null ? `${device.battery_level}%` : "N/A"}
        </div>
        <div className="device-item">
          <strong>Wi-Fi:</strong> {device?.connected_wifi || "N/A"}
        </div>
        <div className="device-item">
          <strong>Last Online:</strong> {formatDate(device?.last_online)}
        </div>
      </div>
    </div>
  );
};

export default DeviceInfo;
