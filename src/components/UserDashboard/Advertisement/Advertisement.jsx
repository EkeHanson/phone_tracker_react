import React from 'react';
import './Advertisement.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import productImage from '../../../assets/tesla.png'

const Advertisement = () => {
  const navigate = useNavigate(); // Initialize useNavigate


  return (
    <div className="advertisement">
      <div className="ad-content">
        <img src={productImage} alt="Product" className="ad-image" />
        <div className="ad-text">
          <h2 className="ad-headline">Exclusive Offer!</h2>
          <p className="ad-description">Get 50% off on all electronics. Limited time only!</p>
          <button className="ad-cta-button" ><a href='https://www.jumia.com' target='_blank'>Shop Now</a></button>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
