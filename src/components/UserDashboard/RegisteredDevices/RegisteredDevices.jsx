import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './RegisteredDevices.css';

// Utility function to format the date
const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const RegisteredDevices = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 3; 

  useEffect(() => {
    // Function to fetch device data from API
    const fetchDevices = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('No access token found.');
        }

        const response = await axios.get(`${djangoHostname}/api/devices/user-devices/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setDevices(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const totalPages = Math.ceil(devices.length / itemsPerPage);
  const indexOfLastDevice = currentPage * itemsPerPage;
  const indexOfFirstDevice = indexOfLastDevice - itemsPerPage;
  const currentDevices = devices.slice(indexOfFirstDevice, indexOfLastDevice);

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

  const handleTrackClick = () => {
    navigate('/users-track');
  };

  if (loading) {
    return <p>Loading devices...</p>;
  }

  if (error) {
    return <p>Error fetching devices: {error}</p>;
  }

  return (
    <div className="registered-devices">
      <h2>Your Devices</h2>
      <div className="device-list">
        {currentDevices.map((device) => (
          <div className="device-card" key={device.id}>
            <h3>{device.name}</h3>
            <p>Registration Date: {formatDate(device.registration_date)}</p> {/* Formatted date */}
            <p>Imei1 Number: {device.imei1}</p>
            <p>Imei2 Number: {device.imei2}</p>
            <button onClick={handleTrackClick}>Track Now</button>
          </div>
        ))}
      </div>

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
