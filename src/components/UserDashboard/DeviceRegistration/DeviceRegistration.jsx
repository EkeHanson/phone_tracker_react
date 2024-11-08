// // src/components/DeviceRegistration.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import './DeviceRegistration.css'; // Include CSS for styling the dashboard

// const DeviceRegistration = () => {
//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
//   const navigate = useNavigate(); // Initialize navigate
//   const [name, setName] = useState('');
//   const [imei1, setImei1] = useState('');
//   const [imei2, setImei2] = useState('');
//   const [image1, setImage1] = useState(null); // State for first image
//   const [image2, setImage2] = useState(null); // State for second image
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleDeviceSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);
  
//     // Create FormData to handle file uploads
//     const deviceData = new FormData();
//     deviceData.append('user', localStorage.getItem('user_id')); // Ensure this user_id exists
//     deviceData.append('name', name);
//     deviceData.append('imei1', imei1);
//     deviceData.append('imei2', imei2);
//     if (image1) {
//       deviceData.append('image1', image1); // Add the first image to FormData
//     }
//     if (image2) {
//       deviceData.append('image2', image2); // Add the second image to FormData
//     }
  
//     try {
//       const response = await axios.post(`${djangoHostname}/api/devices/devices/`, deviceData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           // Include Authorization token if needed
//           'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Example for JWT token
//         },
//       });
      
//       setSuccess('Device registered successfully!');
//       // Reset the form fields
//       setName('');
//       setImei1('');
//       setImei2('');
//       setImage1(null);
//       setImage2(null);

//       setTimeout(() => {
//         navigate('/users-dashboard');
//       }, 3000);
//     } catch (err) {
//       setError('Error registering device. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="device-registration">
//       <h2>Add New Device</h2>
//       <form onSubmit={handleDeviceSubmit} className="registration-form">
//         <input 
//           type="text" 
//           placeholder="Device Name" 
//           value={name} 
//           onChange={(e) => setName(e.target.value)} 
//           required 
//         />
//         <input 
//           type="text" 
//           placeholder="IMEI 1" 
//           value={imei1} 
//           onChange={(e) => setImei1(e.target.value)} 
//           required 
//         />
//         <input 
//           type="text" 
//           placeholder="IMEI 2 (optional)" 
//           value={imei2} 
//           onChange={(e) => setImei2(e.target.value)} 
//         />
//         <input 
//           type="file" 
//           accept="image/*" 
//           onChange={(e) => setImage1(e.target.files[0])} 
//           required 
//         />
//         <input 
//           type="file" 
//           accept="image/*" 
//           onChange={(e) => setImage2(e.target.files[0])} 
//         />
//         <button type="submit" className="submit-button" disabled={loading}>
//           {loading ? 'Registering...' : 'Add Device'}
//         </button>
//       </form>
//       {error && <p className="error">{error}</p>}
//       {success && <p className="success">{success}</p>}
//     </div>
//   );
// };

// export default DeviceRegistration;


// src/components/DeviceRegistration.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './DeviceRegistration.css'; // Include CSS for styling the dashboard

const DeviceRegistration = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const navigate = useNavigate(); // Initialize navigate
  const [name, setName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [imei1, setImei1] = useState('');
  const [imei2, setImei2] = useState('');
  const [image1, setImage1] = useState(null); // State for first image
  const [image2, setImage2] = useState(null); // State for second image
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleDeviceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Create FormData to handle file uploads
    const deviceData = new FormData();
    deviceData.append('user', localStorage.getItem('user_id')); // Ensure this user_id exists
    deviceData.append('name', name);
    
    // Only append ip_address if it's provided
    if (ipAddress.trim() !== '') {
      deviceData.append('ip_address', ipAddress);
    }

    // Only append imei fields if they are provided
    if (imei1.trim() !== '') {
      deviceData.append('imei1', imei1);
    }
    if (imei2.trim() !== '') {
      deviceData.append('imei2', imei2);
    }

    // Append images if they are selected
    if (image1) {
      deviceData.append('image1', image1); // Add the first image to FormData
    }
    if (image2) {
      deviceData.append('image2', image2); // Add the second image to FormData
    }

    try {
      const response = await axios.post(`${djangoHostname}/api/devices/devices/`, deviceData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Include Authorization token if needed
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Example for JWT token
        },
      });
      
      setSuccess('Device registered successfully!');
      // Reset the form fields
      setName('');
      setIpAddress('');
      setImei1('');
      setImei2('');
      setImage1(null);
      setImage2(null);

      setTimeout(() => {
        navigate('/users-dashboard');
      }, 3000);
    } catch (err) {
      console.error(err);
      setError('Error registering device. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="device-registration">
      <h2>Add New Device</h2>
      <form onSubmit={handleDeviceSubmit} className="registration-form">
        <input 
          type="text" 
          placeholder="Device Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="IP Address " 
          value={ipAddress} 
          onChange={(e) => setIpAddress(e.target.value)} 
          pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$" // Simple IPv4 pattern
          title="Enter a valid IPv4 address"
        />
        <input 
          type="text" 
          placeholder="IMEI 1 " 
          value={imei1} 
          onChange={(e) => setImei1(e.target.value)} 
          maxLength="15"
          pattern="\d{15}" // Ensures exactly 15 digits
          title="IMEI must be exactly 15 digits"
        />
        <input 
          type="text" 
          placeholder="IMEI 2 " 
          value={imei2} 
          onChange={(e) => setImei2(e.target.value)} 
          maxLength="15"
          pattern="\d{15}" // Ensures exactly 15 digits
          title="IMEI must be exactly 15 digits"
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImage1(e.target.files[0])} 
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImage2(e.target.files[0])} 
        />
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Registering...' : 'Add Device'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default DeviceRegistration;
