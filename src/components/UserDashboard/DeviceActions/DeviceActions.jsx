import React from 'react';
import './DeviceActions.css'; // Make sure to import the CSS file

const DeviceActions = () => {
  // Dummy action handlers
  const onLock = () => {
    alert('Device locked!');
  };

  const onSoundAlarm = () => {
    alert('Alarm sounded!');
  };

  const onWipeData = () => {
    alert('Data wiped!');
  };

  return (
    <div className="device-actions">
      <h4 className="actions-title">Device Actions</h4>
      <div className="button-container">
        <button className="action-button" onClick={onLock}>Lock Device</button>
        <button className="action-button" onClick={onSoundAlarm}>Sound Alarm</button>
        <button className="action-button" onClick={onWipeData}>Wipe Data</button>
      </div>
    </div>
  );
};

export default DeviceActions;
