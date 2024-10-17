import React from 'react';
import './LandingPage.css';
import NavBar from '../NavBar/NavBar'; // Import the NavBar component
import Footer from '../Footer/Footer';
import Advertisement from '../UserDashboard/Advertisement/Advertisement';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
    // Function to handle button click
    const handleGetStartedClick = () => {
      navigate('/register'); // Navigate to /register
    };
  return (
    <div className="landing-page-container">
      <NavBar /> {/* Use NavBar here */}
      
      <section className="hero-section">
        <div className="hero-content">
          <h1>Track, Secure, and Protect Your Devices</h1>
          <p>
            With PhoneTracker, you can easily locate your lost or stolen device, manage
            its security, and protect your valuable data. Get peace of mind knowing your
            devices are always in control.
          </p>
          <button className="cta-button">Start Tracking Now</button>
        </div>
        <div className="hero-image">
          <Advertisement />
        </div>
      </section>

      <section id="features" className="features-section">
        <h2>Key Features</h2>
        <div className="features-container">
          <div className="feature">
            <h3>Real-Time Tracking</h3>
            <p>Track your device’s location in real-time using GPS, Wi-Fi, or cellular data.</p>
          </div>
          <div className="feature">
            <h3>Remote Security</h3>
            <p>Lock, alarm, or wipe your device remotely to protect sensitive data.</p>
          </div>
          <div className="feature">
            <h3>Geo-Fencing</h3>
            <p>Set boundaries for your device and receive alerts if it's moved out of the zone.</p>
          </div>
          <div className="feature">
            <h3>Device History</h3>
            <p>Review detailed logs of your device’s movement over time for full transparency.</p>
          </div>
          <div className="feature">
            <h3>Emergency Contacts</h3>
            <p>Automatically notify your emergency contacts in case of suspicious activity.</p>
          </div>
          <div className="feature">
            <h3>Admin Dashboard</h3>
            <p>Manage all registered devices and users with an intuitive admin panel.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <h3>1. Register & Add Devices</h3>
            <p>Sign up and add the devices you want to monitor. We support all device types.</p>
          </div>
          <div className="step">
            <h3>2. Start Tracking</h3>
            <p>Start real-time tracking, set geo-fencing boundaries, and manage your devices.</p>
          </div>
          <div className="step">
            <h3>3. Secure & Monitor</h3>
            <p>Remotely secure your devices and access activity logs anytime from your dashboard.</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing-section">
        <h2>Choose Your Plan</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Free Plan</h3>
            <p>Basic features to help track a single device.</p>
            <p><strong>$0/month</strong></p>
            <button className="cta-button" onClick={handleGetStartedClick}>Get Started</button> {/* Updated button */}
          </div>
          <div className="pricing-card">
            <h3>Premium Plan</h3>
            <p>Access advanced security and tracking features.</p>
            <p><strong>$9.99/month</strong></p>
            <button className="cta-button">Upgrade Now</button>
          </div>
          <div className="pricing-card">
            <h3>Enterprise Plan</h3>
            <p>For businesses managing multiple devices.</p>
            <p><strong>Contact Us</strong></p>
            <button className="cta-button">Contact Sales</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
