import React, { useState } from 'react'; 
import NavBar from '../../NavBar/NavBar'; // Import the NavBar component
import Footer from '../../Footer/Footer'; // Import the Footer component
import NavigationLinks from '../../UserDashboard/NavigationLinks/NavigationLinks'
import './Dashboard.css'; // Import CSS file for styling
import UserManagement from '../UserManagement/UserManagement';
import DeviceManagement from '../DeviceManagement/DeviceManagement';
import Reports from '../Reports/Reports';
import Notifications from '../Notifications/Notifications';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users'); // State to handle active tab

  return (
    <div className="admin-dashboard-container"> 
      <NavBar /> {/* Navbar */}
      <NavigationLinks />
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={activeTab === 'users' ? 'active' : ''} 
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
          <button 
            className={activeTab === 'devices' ? 'active' : ''} 
            onClick={() => setActiveTab('devices')}
          >
            Device Management
          </button>
          <button 
            className={activeTab === 'reports' ? 'active' : ''} 
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
          <button 
            className={activeTab === 'notifications' ? 'active' : ''} 
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'devices' && <DeviceManagement />}
          {activeTab === 'reports' && <Reports />}
          {activeTab === 'notifications' && <Notifications />}
        </div>
      </div>

      <Footer /> {/* Footer */}
    </div>
  );
};

export default AdminDashboard;
