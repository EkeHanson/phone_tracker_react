import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassReset.css';
import GlobeIcon from '../../assets/globe-icon.svg';

const ForgotPass = () => {

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${djangoHostname}/api/accounts/password-reset/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccessMessage(data.message); // Display success message
    } catch (err) {
      setError(err.message); // Capture any errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className='Reg_SecO'>
      <div className='Reg_banner'></div>
      <div className='Reg_Env'>
        <div className='Top_Nav_l'>
          <div className='Top_Nav_l_main'>
            <ul className='Rr_Nav_Ul'>
              <li>
                <Link to='/register' className='signup_btn'>Login</Link>
              </li>
            </ul>
            <div className='Rr_Sec_D'>
              <div className='lang_Div'>
                <span><img src={GlobeIcon} alt="Globe Icon" /></span>
                <p>EN</p>
                <ul className='lang_DropDown'>
                  <li>EN</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='Reg_Form_Sec'>
          <div className='Reg_Form_Box'>
            <div className='Reg_Header'>
              <h3>Forgot Password</h3>
            </div>
            <form className='Reg_Form' onSubmit={handleSubmit}>
              <div className='Reg_Input'>
                <input 
                  type="text" 
                  placeholder='Email Address' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  required
                />
              </div>
             
              <div className='Reg_Input'>
                <input type="submit" value='Submit' disabled={loading} />
              </div>
              {loading && <p>Loading...</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
