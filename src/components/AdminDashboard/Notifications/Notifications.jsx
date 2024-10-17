import React, { useState } from 'react';
import './Notifications.css'; // Importing the CSS file

const Notifications = () => {
  const [notification, setNotification] = useState('');
  const [alerts, setAlerts] = useState([]);

  const handleSendNotification = () => {
    if (notification.trim()) {
      const newAlert = {
        id: alerts.length + 1,
        message: notification,
        date: new Date().toLocaleString(),
      };
      setAlerts([...alerts, newAlert]);
      setNotification('');
    }
  };

  return (
    <div className="notifications">
      <h2>Notifications and Alerts Management</h2>
      <p className="description">
        Admins can send alerts or notifications to users regarding suspicious device activity.
      </p>
      <textarea
        className="notification-input"
        placeholder="Enter your notification message here..."
        value={notification}
        onChange={(e) => setNotification(e.target.value)}
      />
      <button className="send-button" onClick={handleSendNotification}>
        Send Notification
      </button>
      <div className="alert-list">
        {alerts.length === 0 ? (
          <p>No notifications sent yet.</p>
        ) : (
          <ul>
            {alerts.map((alert) => (
              <li key={alert.id} className="alert-item">
                <strong>{alert.date}</strong>: {alert.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
