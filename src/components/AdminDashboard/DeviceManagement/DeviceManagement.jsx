// import React, { useState, useEffect } from 'react'; 
// import { FaSearch } from 'react-icons/fa'; // Import search icon
// import './DeviceManagement.css'; // Optional: Add your styles

// const DeviceManagement = () => {
//   const [devices, setDevices] = useState([]);
//   const [filteredDevices, setFilteredDevices] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   const devices1 = [
//     { id: 1, name: 'iPhone 12', type: 'Phone', status: 'online', lastLocation: 'New York' },
//     { id: 2, name: 'Galaxy S21', type: 'Phone', status: 'offline', lastLocation: 'London' },
//     { id: 3, name: 'MacBook Pro', type: 'Laptop', status: 'online', lastLocation: 'San Francisco' }
//   ];

//   useEffect(() => {
//     // Simulating fetching devices data
//     setDevices(devices1);
//     setFilteredDevices(devices1); // Initialize with all devices
//   }, []);

//   const handleSearch = () => {
//     if (!searchQuery) {
//       setFilteredDevices(devices); // If search is empty, show all devices
//       return;
//     }

//     const filtered = devices.filter(device =>
//       device.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredDevices(filtered); // Show filtered results
//   };

//   return (
//     <div className="device-management">
//       <h2>Device Management</h2>
      
//       {/* Search bar */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search for devices..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button onClick={handleSearch}>
//           <FaSearch />
//         </button>
//       </div>

//       {/* Device table */}
//       <table className="device-table">
//         <thead>
//           <tr>
//             <th>Device Name</th>
//             <th>Type</th>
//             <th>Status</th>
//             <th>Last Location</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredDevices.length > 0 ? (
//             filteredDevices.map(device => (
//               <tr key={device.id}>
//                 <td>{device.name}</td>
//                 <td>{device.type}</td>
//                 <td className={device.status === 'online' ? 'status-online' : 'status-offline'}>
//                   {device.status}
//                 </td>
//                 <td>{device.lastLocation}</td>
//                 <td>
//                   <button className="btn-info">Track</button>
//                   <button className="btn-warning">Lock</button>
//                   <button className="btn-info">Reset</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="text-center">No devices found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DeviceManagement;
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import search icon
import './DeviceManagement.css'; // Add your styles

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const devices1 = [
    { id: 1, name: 'iPhone 12', type: 'Phone', status: 'online', lastLocation: 'New York' },
    { id: 2, name: 'Galaxy S21', type: 'Phone', status: 'offline', lastLocation: 'London' },
    { id: 3, name: 'MacBook Pro', type: 'Laptop', status: 'online', lastLocation: 'San Francisco' }
  ];

  useEffect(() => {
    // Simulating fetching devices data
    setDevices(devices1);
    setFilteredDevices(devices1); // Initialize with all devices
  }, []);

  const handleSearch = async () => {
    if (!searchQuery) {
      setFilteredDevices(devices); // If search is empty, show all devices
      return;
    }

    const filtered = devices.filter(device =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDevices(filtered); // Show filtered results
  };

  return (
    <div className="device-management">
      <h2>Device Management</h2>
      
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for devices..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      {/* Device table */}
      <table className="device-table">
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Last Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.length > 0 ? (
            filteredDevices.map(device => (
              <tr key={device.id}>
                <td>{device.name}</td>
                <td>{device.type}</td>
                <td className={device.status === 'online' ? 'status-online' : 'status-offline'}>
                  {device.status}
                </td>
                <td>{device.lastLocation}</td>
                <td>
                  <button className="btn-info">Track</button>
                  <button className="btn-warning">Lock</button>
                  <button className="btn-info">De-register</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No devices found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceManagement;
