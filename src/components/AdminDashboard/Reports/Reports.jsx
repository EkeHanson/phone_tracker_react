import React, { useState } from 'react';
import './Reports.css'; // Importing the CSS file

// Dummy data for report generation
const dummyReports = [
  {
    id: 1,
    date: '2024-10-01',
    device: 'Device A',
    user: 'User 1',
    activity: 'Logged in',
  },
  {
    id: 2,
    date: '2024-10-02',
    device: 'Device B',
    user: 'User 2',
    activity: 'Tracked location',
  },
  {
    id: 3,
    date: '2024-10-03',
    device: 'Device C',
    user: 'User 3',
    activity: 'Sent alert',
  },
];

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateReport = () => {
    setLoading(true);
    // Simulate report generation
    setTimeout(() => {
      setReports(dummyReports);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="reports">
      <h2>Reports</h2>
      <p className="description">
        Generate and view usage reports, track device activity, and monitor user behavior.
      </p>
      <button className={`generate-button ${loading ? 'loading' : ''}`} onClick={generateReport} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Report'}
      </button>
      <div className="report-placeholder">
        {reports.length === 0 ? (
          <p>No reports generated yet.</p>
        ) : (
          <ul className="report-list">
            {reports.map((report) => (
              <li key={report.id} className="report-item">
                <strong>Date:</strong> {report.date} | <strong>Device:</strong> {report.device} | <strong>User:</strong> {report.user} | <strong>Activity:</strong> {report.activity}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Reports;
