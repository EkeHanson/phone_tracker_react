import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmergencyContactsModal from '../EmergencyContactsModal/EmergencyContactsModal'
import './NavigationLinks.css';
import SettingsIcon from '../../../assets/settings.png';
import HistoryIcon from '../../../assets/history.png';
import LogOutIcon from '../../../assets/power.png';

const NavigationLinks = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="navigation-links">
      <div className="nav-buttons">

        {/* Button to open Emergency Contacts Modal */}
        <button onClick={toggleModal} className="nav-button">
        <img src={HistoryIcon} alt="History" className="icon" />
        </button>

        {/* Settings button with icon */}
        <Link to="/notification-settings" className="nav-button">
          <img src={SettingsIcon} alt="Settings" className="icon" />
        </Link>

        {/* Log Out button with icon */}
        <Link to="/register" className="nav-button">
          <img src={LogOutIcon} alt="Log Out" className="icon" />
        </Link>

      </div>

      {/* Emergency Contacts Modal */}
      <EmergencyContactsModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default NavigationLinks;
