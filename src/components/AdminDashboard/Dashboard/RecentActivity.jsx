import React from 'react';
import './RecentActivity.css';

const RecentActivity = () => {
  const activities = [
    'User John Doe logged in at 10:45 AM',
    'Device XYZ123 registered',
    'Report generated for device ABC456',
    'User Jane Smith updated profile',
  ];

  return (
    <div className="recent-activity">
      <h3>Recent Activity</h3>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
