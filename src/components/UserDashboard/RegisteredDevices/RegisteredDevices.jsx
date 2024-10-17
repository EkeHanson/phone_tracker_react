import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './RegisteredDevices.css';

const RegisteredDevices = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  // Sample data to represent devices
  const devices = [
    { id: 1, name: 'iPhone', location: 'New York', status: 'Active' },
    { id: 2, name: 'Tesla', location: 'New York', status: 'Active' },
    { id: 3, name: 'Samsung Galaxy', location: 'San Francisco', status: 'Inactive' },
    { id: 4, name: 'Xiaomi Galaxy', location: 'Nigeria', status: 'Inactive' },
    { id: 5, name: 'Google Pixel', location: 'California', status: 'Active' },
    { id: 6, name: 'OnePlus', location: 'Boston', status: 'Active' },
    { id: 7, name: 'iPad', location: 'London', status: 'Inactive' }
  ];

  const itemsPerPage = 3; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1); // Page state

  // Calculate the total number of pages
  const totalPages = Math.ceil(devices.length / itemsPerPage);

  // Calculate the indices of the devices to display on the current page
  const indexOfLastDevice = currentPage * itemsPerPage;
  const indexOfFirstDevice = indexOfLastDevice - itemsPerPage;
  const currentDevices = devices.slice(indexOfFirstDevice, indexOfLastDevice);

  // Handle navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle track button click
  const handleTrackClick = () => {
    navigate('/users-track'); // Navigate to the /users-track route
  };

  return (
    <div className="registered-devices">
      <h2>Your Devices</h2>
      <div className="device-list">
        {currentDevices.map((device) => (
          <div className="device-card" key={device.id}>
            <h3>{device.name}</h3>
            <p>Last Location: {device.location}</p>
            <p>Status: {device.status}</p>
            <button onClick={handleTrackClick}>Track Now</button> {/* Add onClick handler */}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="pagination-btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RegisteredDevices;
