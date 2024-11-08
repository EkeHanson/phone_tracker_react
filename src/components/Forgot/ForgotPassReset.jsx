import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ForgotPassReset.css';
import GlobeIcon from '../../assets/globe-icon.svg';
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const { uidb64, token } = useParams(); // Capture both uidb64 and token
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${djangoHostname}/api/accounts/reset-password/${uidb64}/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_password: newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccessMessage(data.message);

      setTimeout(() => {
        navigate('/register');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
              <h3>Reset Password</h3>
            </div>
            <form className='Reg_Form' onSubmit={handleSubmit}>
              <div className='Reg_Input'>
                <input 
                  type="password" 
                  placeholder='New Password' 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className='Reg_Input'>
                <input 
                  type="password" 
                  placeholder='Confirm Password' 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
