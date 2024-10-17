import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './HistoryLogPage.css'; // External CSS for styling

const HistoryLogPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDateFilter = () => {
    // Logic for filtering the logs by date range
  };

  const handleExport = (format) => {
    // Logic to export history as CSV or PDF
    alert(`Exporting history log as ${format}`);
  };

  return (
    <div className="history-log-page">
      <div className="color-strips">
        {/* Multiple strips */}
        <div className="strip strip-1"></div>
        <div className="strip strip-2"></div>
        <div className="strip strip-3"></div>
        <div className="strip strip-4"></div>
        <div className="strip strip-5"></div>
        <div className="strip strip-6"></div>
        <div className="strip strip-7"></div>
      </div>

      <div className="history-log-container">
        <h2>Device History Timeline</h2>

        {/* Back Button */}
        <button onClick={() => navigate('/users-dashboard')} className="back-button">
          Back
        </button>

        {/* Date Range Filter */}
        <div className="date-filter">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleDateFilter}>Filter</button>
        </div>

        {/* Timeline */}
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <p><strong>Timestamp:</strong> 2024-10-12 10:30 AM</p>
              <p><strong>Status:</strong> Device Active</p>
              <p><strong>Location:</strong> #123 New Road Borokiri PHC, Nigeria</p>
            </div>
          </div>
          {/* Repeat this block for multiple logs */}
        </div>

        {/* Export Button */}
        <div className="export-section">
          <button onClick={() => handleExport('CSV')}>Export CSV</button>
          <button onClick={() => handleExport('PDF')}>Export PDF</button>
        </div>
      </div>
    </div>
  );
};

export default HistoryLogPage;
