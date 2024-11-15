// src/components/RegisteredDevicesEdit.js
import React, { useState   } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../NavBar/NavBar'; // Import the NavBar component
import Footer from '../../Footer/Footer'; // Import the Footer component
import './RegisteredDevicesEdit.css'; // Include CSS for styling the component

const RegisteredDevicesEdit = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME; // Get the Django hostname
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { id, name, image1, image2, imei1, imei2 } = location.state || {}; // Access state from navigate


  // if (id) {
  //   alert(`Device with ${id} ID not provided`);
  // }
  
  // State variables for device details
  const [deviceName, setDeviceName] = useState(name || '');
  const [deviceImei1, setDeviceImei1] = useState(imei1 || '');
  const [deviceImei2, setDeviceImei2] = useState(imei2 || '');
  const [deviceImage1, setDeviceImage1] = useState(image1 || null);
  const [deviceImage2, setDeviceImage2] = useState(image2 || null);
  
  // State variables for feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Function to handle device update
  const handleDeviceUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Create FormData to handle file uploads
    const deviceData = new FormData();
    deviceData.append('name', deviceName);
    deviceData.append('imei1', deviceImei1);
    deviceData.append('imei2', deviceImei2);
    
    if (deviceImage1) {
      deviceData.append('image1', deviceImage1); // Add the first image to FormData
    }
    if (deviceImage2) {
      deviceData.append('image2', deviceImage2); // Add the second image to FormData
    }

    try {
      const response = await axios.patch(`${djangoHostname}/api/devices/devices/${id}/`, deviceData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Example for JWT token
        },
      });

      // Handle success response
      setSuccess('Device updated successfully!');
      // Reset form fields
      setDeviceName('');
      setDeviceImei1('');
      setDeviceImei2('');
      setDeviceImage1(null);
      setDeviceImage2(null);

      setTimeout(() => {
        navigate('/users-dashboard');
      }, 3000);

    } catch (err) {
      setError('Error updating device. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const mydevicename = deviceName
  return (
    <div>
      <NavBar />
      <div className="device-registration">
        <h2>{mydevicename}</h2>
        <form onSubmit={handleDeviceUpdate}>
          <input 
            type="text" 
            placeholder="Device Name" 
            value={deviceName} 
            onChange={(e) => setDeviceName(e.target.value)} 
            required 
          />
          <input 
            type="text" 
            placeholder="IMEI 1" 
            value={deviceImei1} 
            onChange={(e) => setDeviceImei1(e.target.value)} 
            required 
          />
          <input 
            type="text" 
            placeholder="IMEI 2 (optional)" 
            value={deviceImei2} 
            onChange={(e) => setDeviceImei2(e.target.value)} 
          />
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setDeviceImage1(e.target.files[0])} 
            required 
          />
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setDeviceImage2(e.target.files[0])} 
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Submit'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default RegisteredDevicesEdit;
