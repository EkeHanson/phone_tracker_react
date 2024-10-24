import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './DeviceManagement.css';
import axios from 'axios'; 

const DeviceManagement = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchDevices(currentPage);
  }, [currentPage]);

  const fetchDevices = async (page = 1) => {
    try {
      const response = await axios.get(`${djangoHostname}/api/admin_dashboard/devices/?page=${page}`);
      setDevices(response.data.results);
      setTotalCount(response.data.count);
      setFilteredDevices(response.data.results); // Set this to the full list of devices
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      setCurrentPage(1);
      fetchDevices(); // Reset to the first page
      return;
    }

    try {
      const response = await axios.get(`${djangoHostname}/api/admin_dashboard/search-devices/?q=${searchQuery}`);
      setFilteredDevices(response.data);
      setTotalCount(response.data.length); // Use the count of filtered devices
      setCurrentPage(1); // Reset to the first page on search
    } catch (error) {
      console.error('Error searching devices:', error.response ? error.response.data : error);
    }
  };

  const handleDelete = async (deviceId) => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      try {
        await axios.delete(`${djangoHostname}/api/devices/devices/${deviceId}`);
        fetchDevices(currentPage); // Refresh the device list after deletion
      } catch (error) {
        console.error('Error deleting device:', error);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < totalCount) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
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
              <th>Serial No.</th> {/* Add a header for Serial No. */}
              <th>Device Name</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Last Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device, index) => (
                <tr key={device.id}>
                  {/* Calculate serial number */}
                  <td>{itemsPerPage * (currentPage - 1) + index + 1}</td> {/* Serial No. */}
                  <td>{device.name}</td>
                  <td>{device.user.email}</td>
                  <td className={device.status === 'online' ? 'status-online' : 'status-offline'}>
                    {device.status}
                  </td>
                  <td>{device.lastLocation}</td>
                  <td>
                    <button className="btn-info">Track</button>
                    <button className="btn-warning">Lock</button>
                    <button className="btn-danger" onClick={() => handleDelete(device.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No devices found</td> {/* Update colspan to match new column count */}
              </tr>
            )}
          </tbody>
        </table>


      {/* Pagination controls */}
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage * itemsPerPage >= totalCount}>Next</button>
      </div>
    </div>
  );
};

export default DeviceManagement;
