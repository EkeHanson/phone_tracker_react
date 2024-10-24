import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RegisteredDevicesEdit from '../RegisteredDevicesEdit/RegisteredDevicesEdit';
import './RegisteredDevices.css';

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
 3;

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const navigate = useNavigate();
  const [deleteSuccess, setDeleteSuccess] = useState(false); // New state for delete success alert
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
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

  const handleEditClick = (device) => {
    navigate(`/edit-device/${device.id}`, {
      state: {
        id: device.id,
        name: device.name,
        image1: device.image1,
        image2: device.image2,
        imei1: device.imei1,
        imei2: device.imei2
      }
    });
  };
  
  const handleDeleteClick = (deviceId) => {
    if (window.confirm("Are you sure you want to delete this device?")) {
      axios.delete(`${djangoHostname}/api/devices/devices/${deviceId}/`)
        .then(() => {
          // Filter out the deleted device from the device list
          setDevices(devices.filter(device => device.id !== deviceId));
          setDeleteSuccess(true); // Show red alert on successful delete
          setTimeout(() => setDeleteSuccess(false), 3000); // Hide after 3 seconds
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  
  return (
    <div className="registered-devices">
      <h2>Your Devices</h2>
      {/* Red alert for successful deletion */}
      {deleteSuccess && <div className="alert alert-danger">Device deleted successfully!</div>}
      <div className="device-list">
        {currentDevices.map((device) => (
          <div className="device-card" key={device.id}>
          <h3>{device.name}</h3>
          <p>Registration Date: {formatDate(device.registration_date)}</p>
          <p>Imei1 Number: {device.imei1}</p>
          {/* <p>Imei2 Number: {device.imei2}</p> */}
          {device.image1 && (
            <img 
              src={`${djangoHostname}/${device.image1}`}
              alt={`${device.name} image 1`} 
              className="device-image" 
            />
          )}
          {/* {device.image2 && (
            <img 
              src={`${djangoHostname}/${device.image2}`}
              alt={`${device.name} image 2`} 
              className="device-image" 
            />
          )} */}

          {/* Buttons for Track, Edit, and Delete */}
          <div className="device-buttons">
            <button onClick={handleTrackClick} className="track-btn">Track Now</button>

            <button onClick={() => handleEditClick(device)} className="edit-btn">Edit</button>

            <button onClick={() => handleDeleteClick(device.id)} className="delete-btn">Delete</button>
          </div>
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
