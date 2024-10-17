import React from 'react';
import { Link } from 'react-router-dom';

const RealTimeTrackingOverview = () => {
  // Sample data to represent devices currently being tracked
  const trackedDevices = [
    { id: 1, name: 'iPhone', location: 'New York', time: '10:45 AM' },
    { id: 2, name: 'Samsung Galaxy', location: 'Los Angeles', time: '11:30 AM' },
    { id: 3, name: 'Google Pixel', location: 'San Francisco', time: '12:15 PM' },
    { id: 4, name: 'OnePlus', location: 'Chicago', time: '1:00 PM' }
  ];

  return (
    <div className="real-time-tracking">
      <h2>Real-Time Tracking Overview</h2>
      {trackedDevices.length === 0 ? (
        <p>No devices currently being tracked.</p>
      ) : (
        <ul>
          {trackedDevices.map((device) => (
            <li key={device.id}>
              <strong>{device.name}</strong> is being tracked at {device.location} (Last updated at {device.time}){' '}
              <Link to={`/check-tracking-history/${device.id}`}>Check Tracking History</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RealTimeTrackingOverview;
