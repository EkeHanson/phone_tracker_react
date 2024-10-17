import React, { useState } from 'react';
import TrackingMap from '../TrackingMap/TrackingMap';
import DeviceInfo from '../DeviceInfo/DeviceInfo';
import DeviceActions from '../DeviceActions/DeviceActions';
import GeoFence from '../GeoFence/GeoFence';


const TrackingPage = () => {
  const [device, setDevice] = useState({
    location: [51.505, -0.09], // Example location
    batteryLevel: 85,
    lastOnline: '10 minutes ago',
  });

  const handleLockDevice = () => {
    console.log('Device locked!');
  };

  const handleSoundAlarm = () => {
    console.log('Alarm sounded!');
  };

  const handleWipeData = () => {
    console.log('Device data wiped!');
  };

  const handleSetBoundary = (radius) => {
    console.log(`Geo-fence boundary set to ${radius} meters`);
  };

  return (
    <div className="tracking-page">
      <TrackingMap deviceLocation={device.location} />

      <DeviceActions
        onLock={handleLockDevice}
        onSoundAlarm={handleSoundAlarm}
        onWipeData={handleWipeData}
      />
      <DeviceInfo device={device} />

      <GeoFence onSetBoundary={handleSetBoundary} />
    </div>
  );
};

export default TrackingPage;
