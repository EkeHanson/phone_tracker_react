import React from 'react';
import './DeviceInfo.css'; // Import the CSS file

const DeviceInfo = () => {
  // Updated dummy data for the device with more specific details
  const device = {
    street: '123 Main St',
    buildingNumber: 'Suite 456',
    city: 'Lekki',
    state: 'Lagos',
    postalCode: '10001',
    latitude: 40.7128,
    longitude: -74.0060,
    nearbyLandmark: 'Near Central Park',
    locationAccuracy: '5 meters',
    altitude: '25 meters above sea level',
    batteryLevel: 85,
    speed: '15 km/h',
    direction: 'Northwest',
    lastOnline: '2024-10-14 10:30 AM',
    connectedWiFi: 'Starbucks_WiFi',
    deviceName: 'iPhone 14 Pro Max',
    deviceID: 'XYZ123456',
  };

  return (
    <div className="device-info">
      <h3 className="device-title">Device Information</h3>
      <div className="device-grid">
        <div className="device-item"><strong>Device Name:</strong> {device.deviceName}</div>
        <div className="device-item"><strong>Device ID:</strong> {device.deviceID}</div>
        <div className="device-item"><strong>Street:</strong> {device.street}, {device.buildingNumber}</div>
        <div className="device-item"><strong>City:</strong> {device.city}</div>
        <div className="device-item"><strong>State:</strong> {device.state}</div>
        <div className="device-item"><strong>Postal Code:</strong> {device.postalCode}</div>
        <div className="device-item"><strong>Latitude:</strong> {device.latitude}</div>
        <div className="device-item"><strong>Longitude:</strong> {device.longitude}</div>
        <div className="device-item"><strong>Nearby Landmark:</strong> {device.nearbyLandmark}</div>
        <div className="device-item"><strong>Location Accuracy:</strong> {device.locationAccuracy}</div>
        <div className="device-item"><strong>Altitude:</strong> {device.altitude}</div>
        <div className="device-item"><strong>Speed:</strong> {device.speed}</div>
        {/* <div className="device-item"><strong>Direction:</strong> {device.direction}</div> */}
        {/* <div className="device-item"><strong>Battery Level:</strong> {device.batteryLevel}%</div> */}
        <div className="device-item"><strong>Wi-Fi:</strong> {device.connectedWiFi} (Signal Strength: {device.signalStrength})</div>
        <div className="device-item"><strong>Last Online:</strong> {device.lastOnline}</div>
      </div>
    </div>
  );
};

export default DeviceInfo;
