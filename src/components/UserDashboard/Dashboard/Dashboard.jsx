// src/components/Dashboard/Dashboard.js
import React, { useState } from 'react';
import NavBar from '../../NavBar/NavBar'; // Import the NavBar component
import Footer from '../../Footer/Footer'; // Import the NavBar component
import DeviceRegistration from '../DeviceRegistration/DeviceRegistration';
import Advertisement from '../Advertisement/Advertisement';
import RegisteredDevices from '../RegisteredDevices/RegisteredDevices';
import RealTimeTrackingOverview from '../RealTimeTrackingOverview/RealTimeTrackingOverview';
import NavigationLinks from '../NavigationLinks/NavigationLinks';
import './Dashboard.css'; // Include CSS for styling the dashboard

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('registeredDevices'); // Set default component

  const handleComponentToggle = (component) => {
    setActiveComponent(component);
  };



  return (
    <div>
      <NavBar />
   
    <div className="dashboard-container">
      {/* Navigation */}
      
      {/* <NavigationLinks /> */}

      {/* Action Buttons */}
      <div className="dashboard-actions">
        <button className="dashboard-btn" onClick={() => handleComponentToggle('registeredDevices')}>
          View Devices
        </button>
        <button className="dashboard-btn" onClick={() => handleComponentToggle('deviceRegistration')}>
          Add Device
        </button>
        <button className="dashboard-btn" onClick={() => handleComponentToggle('trackingOverview')}>
          View Tracking
        </button>
      </div>

      {/* Active Component Rendering */}
      {activeComponent === 'registeredDevices' && (
        <div className="section-container">
          <RegisteredDevices />
        </div>
      )}

      {activeComponent === 'deviceRegistration' && (
        <div className="section-container flex-container">
          <Advertisement />
          <DeviceRegistration />
          <Advertisement />
        </div>
      )}

      {activeComponent === 'trackingOverview' && (
        <div className="section-container">
          <RealTimeTrackingOverview />
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default Dashboard;
