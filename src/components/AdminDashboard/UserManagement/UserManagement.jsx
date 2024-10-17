import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import search icon
import './UserManagement.css'; // Optional: Add your styles

const UserManagement = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const users1 = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', status: 'active' }
  ];
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${djangoHostname}/api/users/register/`);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); // Initialize with all users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [djangoHostname]);

  const handleSearch = async () => {
    if (!searchQuery) {
      setFilteredUsers(users); // If search is empty, show all users
      return;
    }

    try {
      const response = await fetch(`${djangoHostname}/api/accounts/search-users/?q=${searchQuery}`);
      const data = await response.json();
      setFilteredUsers(response.ok ? data : []); // Show results or empty if no matches
    } catch (error) {
      console.error('Error searching users:', error);
      setFilteredUsers([]); // Handle error by setting empty array
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      {/* User table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td className={user.is_active === 'active' ? 'status-active' : 'status-inactive'}>
                {/* <td className={user.is_active === 'active' ? 'status-active' : 'status-inactive'}> */}
                  {user.is_active === 'active' ? 'Active' : 'Inactive'}
                </td>
                <td>
                <button className={user.is_active === 'active' ? 'btn-warning' : 'btn-secondary'}>
                  {user.is_active === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button className="btn-info">Edit</button>
                <button className="btn-warning">Delete</button>
              </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
