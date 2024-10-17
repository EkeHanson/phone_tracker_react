import React from 'react';
import './QuickStats.css';

const QuickStats = () => {
  return (
    <div className="quick-stats">
      <div className="stat-card">
        <h3>Total Users</h3>
        <p>1,245</p>
      </div>
      <div className="stat-card">
        <h3>Active Devices</h3>
        <p>543</p>
      </div>
      <div className="stat-card">
        <h3>Reports Generated</h3>
        <p>132</p>
      </div>
      <div className="stat-card">
        <h3>Notifications Sent</h3>
        <p>284</p>
      </div>
    </div>
  );
};

export default QuickStats;
