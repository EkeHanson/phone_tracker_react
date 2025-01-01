import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../NavBar/NavBar';
import Footer from '../../Footer/Footer';
import TrackingMap from '../TrackingMap/TrackingMap';
import DeviceInfo from '../DeviceInfo/DeviceInfo';
import DeviceActions from '../DeviceActions/DeviceActions';
import GeoFence from '../GeoFence/GeoFence';

const TrackingPage = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [device, setDevice] = useState(null); // Initialize device state as null
  const [deviceLocation, setDeviceLocation] = useState([]); // Initialize device state as null

  const { state } = useLocation(); // Correctly access location state
  if (!state || !state.id) {
    console.error("Device ID not passed to TrackingPage.");
    return <div>Error: No device information provided.</div>;
  }

  const { id, name } = state;

  
  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const response = await fetch(`${djangoHostname}/api/devices/api/trackable-link-status/${id}`);
        // const response = await fetch(`${djangoHostname}/api/devices/devices/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch device data");
        }
        const data = await response.json();

        // console.log("data")
        // console.log(data)
        // console.log("data")
  
        // Set default values for missing latitude and longitude
        const latitude = data.latitude ?? 4.8396;
        const longitude = data.longitude ?? 6.9112;
  
        // Update the device object with defaults if necessary
        const updatedDevice = {
          ...data,
          latitude,
          longitude,
        };
  
        setDevice(updatedDevice);
        setDeviceLocation([latitude, longitude]);
      } catch (error) {
        console.error("Error fetching device data:", error);
      }
    };
  
    fetchDeviceData();
  }, [djangoHostname, id]);
  

  const handleLockDevice = () => {
    console.log("Device locked!");
  };

  const handleSoundAlarm = () => {
    console.log("Alarm sounded!");
  };

  const handleWipeData = () => {
    console.log("Device data wiped!");
  };

  const handleSetBoundary = (radius) => {
    console.log(`Geo-fence boundary set to ${radius} meters`);
  };

  if (!device || !device.latitude || !device.longitude) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <NavBar />
      <div className="tracking-page">
        <TrackingMap deviceLocation={deviceLocation} />
        <DeviceActions
          onLock={handleLockDevice}
          onSoundAlarm={handleSoundAlarm}
          onWipeData={handleWipeData}
        />
        <DeviceInfo device={device} />
        <GeoFence onSetBoundary={handleSetBoundary} />
      </div>
      <Footer />
    </div>
  );
};

export default TrackingPage;
