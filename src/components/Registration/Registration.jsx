import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle redirection
import logo1 from '../../assets/power.png';
import './Registration.css';


const Registration = () => {
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate(); // Get navigate function from react-router-dom

    const handleForgottenPassClick = () => {
      navigate('/forgotten_pass');
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
    
      // Validate the register form
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match');
        setLoading(false);
        return;
      }
    
      const url = isLogin
        ? `${djangoHostname}/api/users/login/`
        : `${djangoHostname}/api/users/register/`;
    
      const data = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
          };
    
      try {
        const response = await axios.post(url, data);
        // console.log('Success:', response.data);
    
        if (isLogin) {
          // Store the response data in local storage
          localStorage.setItem('user_id', response.data.userId);
          localStorage.setItem('user_email', response.data.email);
          localStorage.setItem('user_phone', response.data.phone);
          localStorage.setItem('user_first_name', response.data.first_name);
          localStorage.setItem('user_last_name', response.data.last_name);
          localStorage.setItem('user_user_type', response.data.user_type);
          localStorage.setItem('access_token', response.data.access);
          
            if(response.data.user_type === "admin"){
              navigate('/admin-dashboard');
            }else{
            navigate('/users-dashboard');
            }
        } else {
          // Redirect to login page after successful registration
          setIsLogin(true); // Switch to login form
        }
      } catch (error) {
        setErrorMessage('An error occurred. Please try again.');
      }
      setLoading(false);
    };
    
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Logo Section */}
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo1} alt="PhoneTracker Logo" className="logo-image" />
        </div>
        <div className="social-login">
          <p>{isLogin ? 'login' : 'register'} with</p>
          <button className="google-login">Google</button>
          <button className="apple-login">Apple</button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          )}

          {errorMessage && <p className="error">{errorMessage}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        {isLogin && (
          <a href=""  onClick={handleForgottenPassClick} className="forgot-password">
            Forgot Password?
          </a>
        )}

        <p className="toggle-auth">
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};


export default Registration;
