
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaUserCircle, FaPhone, FaQuestionCircle, FaStar, FaDollarSign } from 'react-icons/fa';
import logo1 from '../../assets/power.png';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
   
  const [menuActive, setMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  const handleAccountClick = () => {
    if (isLoggedIn) {
      // Handle logout logic
      localStorage.removeItem('access_token');
      setIsLoggedIn(false);
      navigate('/'); // Redirect to homepage or login page
    } else {
      navigate('/register');
    }
  };



  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/users-dashboard');
    } else {
      navigate('/register');
    }
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };


  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo1} alt="PhoneTracker Logo" className="logo-image" />
        </div>

        {/* Navigation Links */}
        <nav className={menuActive ? 'nav-menu active' : 'nav-menu'}>
          <a href="#features" onClick={closeMenu} className="nav-link">
            <FaStar className="nav-icon" /> Features
          </a>
          <a href="#how-it-works" onClick={closeMenu} className="nav-link">
            <FaSearch className="nav-icon" /> How It Works
          </a>
          <a href="#pricing" onClick={closeMenu} className="nav-link">
            <FaDollarSign className="nav-icon" /> Pricing
          </a>
          <a href="" onClick={() => navigate('/contact-us')} className="nav-link">
            <FaPhone className="nav-icon" /> Contact Us
          </a>
          <button className="cta-button" onClick={handleButtonClick}>
            {isLoggedIn ? 'See Devies' : 'Get Started'}
          </button>

          {/* Account and Social Icons */}

          {/* <div className="nav-icons">

            <FaUserCircle className="nav-icon" title="Account" onClick={() => navigate('/users-dashboard')} />


            <FaQuestionCircle className="nav-icon" title="Help" onClick={() => navigate('/faq-us')} />
          </div> */}

          <div className="nav-icons">
            <FaUserCircle className="nav-icon" title="Account" onClick={handleAccountClick} />
            
            <FaQuestionCircle className="nav-icon" title="Help" onClick={() => navigate('/faq-us')} />
          </div>

        </nav>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {menuActive ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
