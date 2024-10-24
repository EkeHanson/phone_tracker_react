// import React, { useState, useEffect } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import './UserManagement.css';

// const UserManagement = () => {
//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const pageSize = 15;

//   const [statusFilter, setStatusFilter] = useState('all');
//   const [devicesFilter, setDevicesFilter] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async (page = 1) => {
//       try {
//         const response = await fetch(`${djangoHostname}/api/admin_dashboard/users/?page=${page}`);
//         const data = await response.json();

//         if (response.ok) {
//           setUsers(data.results);
//           setTotalPages(data.count ? Math.ceil(data.count / pageSize) : 1);
//           applyFilters(data.results); // Apply filters right after fetching
//         } else {
//           console.error('Failed to fetch users');
//         }
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers(currentPage);
//   }, [currentPage, djangoHostname]);

//   const handleSearch = async () => {
//     if (!searchQuery) {
//       setFilteredUsers(users);
//       return;
//     }

//     try {
//       const response = await fetch(`${djangoHostname}/api/admin_dashboard/search-users/?q=${searchQuery}`);
//       const data = await response.json();
//       if (response.ok) {
//         applyFilters(data); // Apply filters to the search results
//       } else {
//         setFilteredUsers([]);
//       }
//     } catch (error) {
//       console.error('Error searching users:', error);
//       setFilteredUsers([]);
//     }
//   };

//   const toggleUserStatus = async (userId, currentStatus) => {
//     const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

//     try {
//       const response = await fetch(`${djangoHostname}/api/users/register/${userId}/`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ is_active: newStatus }),
//       });

//       if (response.ok) {
//         const updatedUsers = users.map(user =>
//           user.id === userId ? { ...user, is_active: newStatus } : user
//         );
//         setUsers(updatedUsers);
//         applyFilters(updatedUsers); // Reapply filters after status change
//       } else {
//         console.error('Failed to update user status');
//       }
//     } catch (error) {
//       console.error('Error updating user status:', error);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    
//     if (!isConfirmed) return;

//     try {
//       const response = await fetch(`${djangoHostname}/api/users/register/${userId}/`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         const updatedUsers = users.filter(user => user.id !== userId);
//         setUsers(updatedUsers);
//         applyFilters(updatedUsers); // Reapply filters after deletion
//       } else {
//         console.error('Failed to delete user');
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   const handlePageChange = (direction) => {
//     setCurrentPage((prevPage) => {
//       if (direction === 'next' && prevPage < totalPages) return prevPage + 1;
//       if (direction === 'prev' && prevPage > 1) return prevPage - 1;
//       return prevPage;
//     });
//   };

//   const applyFilters = (usersToFilter) => {
//     let filtered = usersToFilter;

//     if (statusFilter === 'active') {
//       filtered = filtered.filter(user => user.is_active === 'active');
//     } else if (statusFilter === 'inactive') {
//       filtered = filtered.filter(user => user.is_active === 'inactive');
//     }

//     if (devicesFilter) {
//       filtered = filtered.filter(user => user.devices && user.devices.length > 3);
//     }

//     setFilteredUsers(filtered);
//   };

//   const handleStatusChange = (e) => {
//     setStatusFilter(e.target.value);
//     applyFilters(users); // Apply filters based on current users
//   };

//   const handleDevicesChange = (e) => {
//     setDevicesFilter(e.target.checked);
//     applyFilters(users); // Apply filters based on current users
//   };

//   return (
//     <div className="user-management">
//       <h2>User Management</h2>

//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search for users..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button onClick={handleSearch}>
//           <FaSearch />
//         </button>
//       </div>

//       <div className="filter-options">
//         <select value={statusFilter} onChange={handleStatusChange}>
//           <option value="all">All Users</option>
//           <option value="active">Active Users</option>
//           <option value="inactive">Inactive Users</option>
//         </select>
//         <label>
//           <input
//             type="checkbox"
//             checked={devicesFilter}
//             onChange={handleDevicesChange}
//           />
//           Users with more than 5 devices
//         </label>
//       </div>

//       <table className="user-table">
//         <thead>
//           <tr>
//             <th>S/N</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Devices</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.length > 0 ? (
//             filteredUsers.map((user, index) => (
//               <tr key={user.id}>
//                 <td>{(currentPage - 1) * pageSize + index + 1}</td>
//                 <td>{user.first_name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.phone}</td>
//                 <td>{user.devices ? user.devices.length : 0}</td>
//                 <td className={user.is_active === 'active' ? 'status-active' : 'status-inactive'}>
//                   {user.is_active === 'active' ? 'Active' : 'Inactive'}
//                 </td>
//                 <td>
//                   <button
//                     className={user.is_active === 'active' ? 'btn-warning' : 'btn-secondary'}
//                     onClick={() => toggleUserStatus(user.id, user.is_active)}
//                   >
//                     {user.is_active === 'active' ? 'Deactivate' : 'Activate'}
//                   </button>
//                   <button className="btn-warning" onClick={() => handleDeleteUser(user.id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" className="text-center">No users found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div className="pagination">
//         <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;


import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './UserManagement.css';

const UserManagement = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 15;

  // State variables for filters
  const [statusFilter, setStatusFilter] = useState('all'); // 'active', 'inactive', 'all'
  const [devicesFilter, setDevicesFilter] = useState(false); // true for more than 5 devices

  // Fetch users with pagination
  useEffect(() => {
    const fetchUsers = async (page = 1) => {
      try {
        const response = await fetch(`${djangoHostname}/api/admin_dashboard/users/?page=${page}`);
        const data = await response.json();

        if (response.ok) {
          setUsers(data.results);
          setFilteredUsers(data.results);
          setTotalPages(data.count ? Math.ceil(data.count / pageSize) : 1);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(currentPage);
  }, [currentPage, djangoHostname]);

  // Handle search functionality
  const handleSearch = async () => {
    if (!searchQuery) {
      setFilteredUsers(users);
      return;
    }

    try {
      const response = await fetch(`${djangoHostname}/api/admin_dashboard/search-users/?q=${searchQuery}`);
      const data = await response.json();
      setFilteredUsers(response.ok ? data : []);
    } catch (error) {
      console.error('Error searching users:', error);
      setFilteredUsers([]);
    }
  };

  // Toggle user status
  const toggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

    try {
      const response = await fetch(`${djangoHostname}/api/users/register/${userId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: newStatus }),
      });

      if (response.ok) {
        const updatedUsers = users.map(user =>
          user.id === userId ? { ...user, is_active: newStatus } : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      } else {
        console.error('Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  // Handle user deletion with confirmation
  const handleDeleteUser = async (userId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    
    if (!isConfirmed) return;

    try {
      const response = await fetch(`${djangoHostname}/api/users/register/${userId}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle pagination
  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === 'next' && prevPage < totalPages) return prevPage + 1;
      if (direction === 'prev' && prevPage > 1) return prevPage - 1;
      return prevPage; // Return current page if no change
    });
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = users;

    // Filter by status
    if (statusFilter === 'active') {
      filtered = filtered.filter(user => user.is_active === 'active');
    } else if (statusFilter === 'inactive') {
      filtered = filtered.filter(user => user.is_active === 'inactive');
    }

    // Filter by number of devices
    if (devicesFilter) {
      filtered = filtered.filter(user => user.devices && user.devices.length > 5);
    }

    setFilteredUsers(filtered);
  };

  // Handle filter change
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    applyFilters();
  };

  const handleDevicesChange = (e) => {
    setDevicesFilter(e.target.checked);
    applyFilters();
  };

  // Effect to apply filters whenever users or filters change
  useEffect(() => {
    applyFilters();
  }, [statusFilter, devicesFilter, users]);

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

      {/* Filter options */}
      <div className="filter-options">
        <select value={statusFilter} onChange={handleStatusChange}>
          <option value="all">All Users</option>
          <option value="active">Active Users</option>
          <option value="inactive">Inactive Users</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={devicesFilter}
            onChange={handleDevicesChange}
          />
          Users with more than 5 devices
        </label>
      </div>

      {/* User table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Devices</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                <td>{user.first_name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.devices ? user.devices.length : 0}</td>
                <td className={user.is_active === 'active' ? 'status-active' : 'status-inactive'}>
                  {user.is_active === 'active' ? 'Active' : 'Inactive'}
                </td>
                <td>
                  <button
                    className={user.is_active === 'active' ? 'btn-warning' : 'btn-secondary'}
                    onClick={() => toggleUserStatus(user.id, user.is_active)}
                  >
                    {user.is_active === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="btn-warning" onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
