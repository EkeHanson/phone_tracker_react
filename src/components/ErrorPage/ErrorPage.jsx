// src/components/ErrorPage.js
import React from 'react';
import './ErrorPage.css'; // You can style it as per your need

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>We can't seem to find the page you're looking for.</p>
      <p>Error code: 404</p>
      <a href="/users-dashboard" className="home-link">Go back to Home</a>
    </div>
  );
};

export default ErrorPage;
