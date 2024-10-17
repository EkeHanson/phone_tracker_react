import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Registration from './components/Registration/Registration';
import ContactUs from './components/ContactUs/ContactUs';
import FAQ from './components/FAQ/FAQ';

import Dashboard from './components/UserDashboard/Dashboard/Dashboard';
import ErrorPage from './components/ErrorPage/ErrorPage';

import TrackingPage from './components/UserDashboard/TrackingPage/TrackingPage'
import HistoryLogPage from './components/UserDashboard/HistoryLogPage/HistoryLogPage'


import AdminDashboard from './components/AdminDashboard/Dashboard/Dashboard'

import EmergencyContacts from './components/UserDashboard/EmergencyContactsModal/EmergencyContactsModal';


import DeviceRegistration from './components/UserDashboard/DeviceRegistration/DeviceRegistration';
import RegisteredDevices from './components/UserDashboard/RegisteredDevices/RegisteredDevices'
import RealTimeTrackingOverview  from './components/UserDashboard/RealTimeTrackingOverview/RealTimeTrackingOverview'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/check-tracking-history/:id" element={<HistoryLogPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/faq-us" element={<FAQ />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/users-dashboard" element={<Dashboard />} />
        <Route path="/users-track" element={<TrackingPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;

