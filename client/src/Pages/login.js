import React, { useState } from 'react';
import './login.css';
import logo from '../logo1.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Login successful');
        switch (result.role) {
          case 'HSA':
            navigate('/hsadashboard');
            break;
          case 'Police':
            navigate('/police_dashboard');
            break;
          case 'CCTVUnit':
            navigate('/cctv_dashboard');
            break;
          default:
            setMessage('Invalid user role');
            break;
        }
      } else {
        setMessage(result.msg);
        alert('invalid password or email');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('invalid password or email');
    }
  };

  return (
    <div className="main-signin">
      <div>
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="signin-signup">
        <div className="signin"></div>
        <div className="signup">
          <form className="form" onSubmit={handleSubmit}>
            <div><p className='login-text'>Login</p></div>
            
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <div className="password-container">
            <label className="label">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            <br />

            <button type="submit" className='login-btn'>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
