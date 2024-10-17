import React, { useState } from 'react';
import './EmergencyContactsModal.css';

const EmergencyContactsModal = ({ isOpen, onClose }) => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [locationSharing, setLocationSharing] = useState(false);

  const handleAddContact = (e) => {
    e.preventDefault();
    if (name && phone && relationship) {
      setContacts([...contacts, { name, phone, relationship }]);
      setName('');
      setPhone('');
      setRelationship('');
    }
  };

  const handleDeleteContact = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Emergency Contacts</h2>
          <form onSubmit={handleAddContact} className="contact-form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Relationship"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              required
            />
            <button type="submit">Add Contact</button>
          </form>

          <div className="location-sharing">
            <label>
              <input
                type="checkbox"
                checked={locationSharing}
                onChange={() => setLocationSharing(!locationSharing)}
              />
              Share Device Location
            </label>
            <p className="info-text">
              Emergency contacts will be notified of your location if enabled.
            </p>
          </div>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    )
  );
};

export default EmergencyContactsModal;
