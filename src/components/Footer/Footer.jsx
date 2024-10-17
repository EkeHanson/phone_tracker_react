import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../../assets/power.png';
import googleLogo from '../../assets/google.png';     
import amazonLogo from '../../assets/amazon.png';
import teslaLogo from '../../assets/tesla.png';
import toyotaLogo from '../../assets/toyota.png';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate(); // Initialize useNavigate

   // Function to handle button click
   const handleFAQClick = () => {
    navigate('/faq-us'); // Navigate to /faq-us
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logo-section">
          <img src={logo} alt="PhoneTracker Logo" className="footer-logo" />
          <p>Your go-to solution for tracking, securing, and managing all your devices.</p>
        </div>

        <div className="footer-section partners-section">
          <h3>Our Partners</h3>
          <div className="partners-logos">
            <img src={googleLogo} alt="Google" className="partner-logo" />
            <img src={amazonLogo} alt="Amazon" className="partner-logo" />
            <img src={teslaLogo} alt="Tesla" className="partner-logo" />
            <img src={toyotaLogo} alt="Toyota" className="partner-logo" />
          </div>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
              <button onClick={handleFAQClick} className="footer-link">FAQ</button>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@phonetracker.com</p>
          <p>Phone: +123 456 7890</p>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 PhoneTracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
